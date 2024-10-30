import { useEffect, useState } from 'react'
import { supabase } from './supaBaseClient'
import Map from './assets/map'

function App() {
  const [posts, setPosts] = useState([])
  console.log(posts,'hi')
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('map_table')
        .select('*')

      if (error) console.error('Error fetching posts:', error)
      else setPosts(data)
    }

    fetchPosts()
  }, [])


  const handleInserts = (payload) => {

    setPosts(prev => [...prev, payload.new]);
  }
  
  // Listen to inserts
  useEffect(()=>{ 
  supabase
    .channel('map_table')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'map_table' }, handleInserts)
    .subscribe()
  
},[])
  return (
    <div style = {{zIndex:50}}>
 
      <Map/>
  
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.name +' '+ post.created_at}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

/*
CREATE POLICY "Allow access based on user_map_climb_table" 
ON public.maps 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM user_map_climb_table 
    WHERE user_map_climb_table.map_id = maps.map_id 
      AND user_map_climb_table.user_id = auth.uid::int
  )
);



*/