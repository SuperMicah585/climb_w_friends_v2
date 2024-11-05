import { useEffect, useState } from 'react';
import { supabase } from '../../supaBaseClient';
import { Post } from '../../types/Posts';
import { notificationSVG,closeIcon } from '../mapComponents/mapStyles'
import Draggable from 'react-draggable';

const ActivityFeed = () =>{

    const [posts, setPosts] = useState<Post[]>([]);
    const [feedToggle,setFeedToggle] = useState(false)
  
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

  feedToggle?
   (<Draggable>
    


    <div className = 'flex flex-col cursor-grab items-center justify-center absolute z-10 border border-slate-500 right-1 top-1 rounded bg-zinc-900 bg-opacity-90 text-white'>
   
   <div className ='w-full pb-3 flex justify-end'> <div onClick = {()=>setFeedToggle(false)}  className = 'flex cursor-pointer p-1 mr-1 mt-1 hover:bg-opacity-75 hover:bg-slate-500 rounded-full'> {closeIcon} </div>  </div>
    <div className='h-80 overflow-y-scroll gap-5 flex flex-col items-center pl-5 pr-5'>
    
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

  </Draggable>):

    <div onClick = {()=> setFeedToggle(true)} className = 'cursor-pointer hover:text-violet-500 z-20 p-2 bg-slate-900 opacity-90 border border-slate-500 hover:border-violet-500 rounded-full absolute top-5 right-5'> {notificationSVG} </div>  
)

}; export default ActivityFeed;