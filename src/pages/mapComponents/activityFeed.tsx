import { useEffect, useState } from 'react';
import { supabase } from '../../supaBaseClient';
import { Post } from '../../types/Posts';
import { notificationSVG,closeIcon } from '../mapComponents/mapStyles'
import Draggable from 'react-draggable';

const ActivityFeed = ({feedToggle}) =>{

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


    const colors = {'Ben':'border-green-400','Micah':'border-blue-400','marsh':'border-red-400','theresa':'border-orange-400','Corbin':'border-violet-400'
    }


return(

  feedToggle?
   (<Draggable>
    


    <div className = 'flex flex-col pt-3 cursor-grab items-center justify-center absolute z-10 border border-slate-500 right-1 top-1 rounded-lg pb-3 bg-zinc-900 bg-opacity-90 text-white'>
   
   
    <div className='h-80 overflow-y-scroll gap-5 flex flex-col items-center pl-5 pr-5'>
    
    <ul className='flex flex-col gap-2 pl-2 text-white'>
      {posts.map((post) => (
        
        <div className={`flex flex-col items-center justify-center ${colors[post.name] || 'bg-gray-500'} border-2 pl-5 pr-5 pt-2 pb-2 rounded-lg opacity-75`}>
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

    null
)

}; export default ActivityFeed;