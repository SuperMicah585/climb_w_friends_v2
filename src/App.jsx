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
      <div className = 'absolute flex justify-center items-center left-5 top-5 gap-10 '>
      <input
          type="text"
          placeholder="Add Climbs"
          className="border border-gray-300 rounded-xl p-2 w-64 focus:outline-none text-black focus:ring-2 focus:ring-violet-900"
        />
        <div className = 'flex hover:opacity-90 cursor-pointer justify-center items-center bg-violet-900 h-8 w-20 rounded-3xl text-white font-semibold'> Button1 </div>
        <div className = 'flex justify-center items-center bg-violet-900 h-8 w-20 rounded-3xl text-white font-semibold'> Button2 </div>
        <div className = 'flex justify-center items-center bg-violet-900 h-8 w-20 rounded-3xl text-white font-semibold'> Button3 </div>

      </div>
      <div className = 'absolute gap-5 flex flex-col items-center pointer-events-none p-5 right-1 top-1 rounded bg-zinc-900 bg-opacity-50 text-white'> 
      <div className = 'text-2xl'>Activity Feed</div>
      <ul className= 'flex flex-col gap-1  list-disc pl-2 text-slate-200'>
        {posts.map(post => (
          <>
          <li className = 'font-semibold' key={post.id}>{post.name + ' ' + 'joined' }</li>
          <div className = 'text-sm'> 2024-10-27 01:01:01+00</div>
          <div className = 'mb-2 border-slate-700 border-b'> </div>
          </>
        ))}
      </ul>
      </div>
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