import { useEffect, useState } from 'react';
import { supabase } from '../../supaBaseClient';
import { Post } from '../../types/Posts';
import Draggable from 'react-draggable';

interface ActivityFeedProps {
  feedToggle: boolean;
}
const ActivityFeed: React.FC<ActivityFeedProps> = ({ feedToggle }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('map_table').select('*');

      if (error) console.error('Error fetching posts:', error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleInserts = (payload: { new: Post }) => {
    setPosts((prev) => [...prev, payload.new]);
  };

  // Listen to inserts
  useEffect(() => {
    supabase
      .channel('map_table')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'map_table' },
        handleInserts,
      )
      .subscribe();
  }, []);

  const colors = {
    Ben: 'border-green-400',
    Micah: 'border-blue-400',
    marsh: 'border-red-400',
    theresa: 'border-orange-400',
    Corbin: 'border-violet-400',
  };

  return feedToggle ? (
    <Draggable>
      <div className="absolute right-5 top-20 z-10 flex cursor-grab flex-col items-center justify-center rounded-lg border border-slate-500 bg-zinc-900 bg-opacity-90 pb-3 pt-3 text-white">
        <div className="flex w-full items-center justify-center border-b border-slate-500 pb-2 font-semibold">
          {' '}
          Map Events
        </div>
        <div className="mt-1 flex h-80 flex-col items-center gap-5 overflow-y-scroll pl-2 pr-2">
          <ul className="flex flex-col gap-2 pl-2 text-white">
            {posts.map((post, index) => (
              <div
                className={`flex flex-col justify-center ${colors[post.name] || 'bg-gray-500'} border-l-2 pb-2 pl-5 pr-5 pt-2 opacity-75`}
                key={index}
              >
                <li className="text-sm font-semibold" key={post.id}>
                  {post.name + ' ' + 'joined'}
                </li>
                <div className="text-xs">
                  {' '}
                  {new Date(post.created_at).toLocaleString('en-US')}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Draggable>
  ) : null;
};
export default ActivityFeed;
