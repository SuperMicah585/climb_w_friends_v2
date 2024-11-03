import { useEffect, useState } from 'react';
import { supabase } from '../../supaBaseClient';
import { Post } from '../../types/Posts';

const ActivityFeed = () =>{

    const [posts, setPosts] = useState<Post[]>([]);
  
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


return(
   <div className = 'flex flex-col items-center justify-center absolute z-10 border-zinc-900 border right-1 top-1 rounded bg-zinc-900 bg-opacity-65 text-white'> 
   <div className='text-2xl p-3'>Activity Feed</div>
    <div className='h-96 overflow-y-scroll gap-5 flex flex-col items-center pl-5 pr-5'>
    
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
)

}; export default ActivityFeed;