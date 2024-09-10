import { Button } from '@/components/ui/button'
import { useTypedSelector } from '@/store/store';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const status = useTypedSelector((state) => state.auth.status);
const  handlePlayWithFriend = () => {
  if (!status) {
    navigate("/auth/signin");
    return;
  }
  /// TODO: Open Friend Model 
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4">
    
      <p className="text-primary/80 text-md sm:text-xl md:text-2xl mb-12 text-center 2xl:mt-10">
        PLAY OFFLINE OR WITH YOUR FRIENDS AND HAVE FUN
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/1v1-bot">
        <Button className="bg-transparent  text-white font-bold py-2 px-4 rounded border border-white">
          PLAY WITH BOT
        </Button>
        </Link>
       <Button onClick={handlePlayWithFriend} className="bg-transparent text-white font-bold py-2 px-4 rounded border border-white">
          PLAY WITH FRIEND
        </Button>
      </div>
    </div>
  )
}

export default Home
