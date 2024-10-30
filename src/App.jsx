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
        placeholder="Search for Climbs"
        className="rounded-xl p-2 w-64 focus:outline-none text-black bg-slate-50 focus:ring-2 focus:ring-violet-900 shadow-lg"
      />
        <div className = 'flex shadow-lg hover:opacity-90 cursor-pointer justify-center items-center bg-violet-900 h-8 w-20 rounded-3xl text-white font-semibold'> Button1 </div>
        <div className = 'flex shadow-lg justify-center items-center bg-violet-900 h-8 w-20 rounded-3xl text-white font-semibold'> Button2 </div>
        <div className = 'flex shadow-lg justify-center items-center bg-violet-900 h-8 w-20 rounded-3xl text-white font-semibold'> Activity </div>

      </div>
      <div className = 'absolute h-96 overflow-y-scroll gap-5 flex flex-col items-center p-5 right-1 top-1 rounded bg-zinc-900 bg-opacity-65 text-white'> 
      <div className = 'text-2xl'>Activity Feed</div>
      <ul className= 'flex flex-col gap-2 pl-2 text-slate-200'>
        {posts.map(post => (
          <div className='flex flex-col items-center justify-center bg-green-400 pl-5 pr-5 pt-2 pb-2 rounded-lg bg-opacity-50'>
          <li className = 'font-semibold font-sm' key={post.id}>{post.name + ' ' + 'joined' }</li>
          <div className = 'text-xs'> {new Date(post.created_at).toLocaleString('en-US')}</div>
          </div>
        ))}
                {posts.map(post => (
          <div className='flex flex-col items-center justify-center bg-blue-400 pl-5 pr-5 pt-2 pb-2 rounded-lg bg-opacity-50'>
          <li className = 'font-semibold font-sm' key={post.id}>{post.name + ' ' + 'joined' }</li>
          <div className = 'text-xs'> {new Date(post.created_at).toLocaleString('en-US')}</div>
          </div>
        ))}

{posts.map(post => (
          <div className='flex flex-col items-center justify-center bg-red-400 pl-5 pr-5 pt-2 pb-2 rounded-lg bg-opacity-50'>
          <li className = 'font-semibold font-sm' key={post.id}>{post.name + ' ' + 'joined' }</li>
          <div className = 'text-xs'> {new Date(post.created_at).toLocaleString('en-US')}</div>
          </div>
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