import { useEffect, useState } from 'react';
import { supabase } from './supaBaseClient';
import Map from './assets/map';
import { Post } from './types/Posts';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts, 'hi');
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('map_table').select('*');

      if (error) console.error('Error fetching posts:', error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleInserts = (payload: {new: Post }) => {
    setPosts((prev) => [...prev, payload.new]);
  };

  // Listen to inserts
  useEffect(() => {
    supabase
      .channel('map_table')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'map_table' },
        handleInserts
      )
      .subscribe();
  }, []);
  return (
    <div style={{ zIndex: 50 }}>
      <Map />

      <div className='absolute flex justify-center items-center left-5 top-5 gap-10 '>
        <input
          type='text'
          placeholder='Search for Climbs'
          className='rounded-xl text-purple-900 pl-16 w-96 p-3 w-64 focus:outline-none text-black bg-slate-50 focus:ring-2 focus:ring-violet-900 shadow-lg'
        />

        <div className='absolute hover:opacity-50 text-violet-900 cursor-pointer z-10 left-2'>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentcolor'
            className='size-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </div>
      </div>
      <div className='absolute border-zinc-900 border h-1/2 overflow-y-scroll gap-5 flex flex-col items-center p-5 right-1 top-1 rounded bg-zinc-900 bg-opacity-65 text-white'>
        <div className='text-2xl'>Activity Feed</div>
        <ul className='flex flex-col gap-2 pl-2 text-slate-200'>
          {posts.map((post) => (
            <div className='flex flex-col items-center justify-center bg-green-400 pl-5 pr-5 pt-2 pb-2 rounded-lg bg-opacity-50'>
              <li className='font-semibold font-sm' key={post.id}>
                {post.name + ' ' + 'joined'}
              </li>
              <div className='text-xs'>
                {' '}
                {new Date(post.created_at).toLocaleString('en-US')}
              </div>
            </div>
          ))}
          {posts.map((post) => (
            <div className='flex flex-col items-center justify-center bg-blue-400 pl-5 pr-5 pt-2 pb-2 rounded-lg bg-opacity-50'>
              <li className='font-semibold font-sm' key={post.id}>
                {post.name + ' ' + 'joined'}
              </li>
              <div className='text-xs'>
                {' '}
                {new Date(post.created_at).toLocaleString('en-US')}
              </div>
            </div>
          ))}

          {posts.map((post) => (
            <div className='flex flex-col items-center justify-center bg-red-400 pl-5 pr-5 pt-2 pb-2 rounded-lg bg-opacity-50'>
              <li className='font-semibold font-sm' key={post.id}>
                {post.name + ' ' + 'joined'}
              </li>
              <div className='text-xs'>
                {' '}
                {new Date(post.created_at).toLocaleString('en-US')}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

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
