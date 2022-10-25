import React from 'react';
import { useSelector } from 'react-redux';


const Content = () => {
const user = useSelector((store) => store.toolkit.user)
  console.log('user from content', user);

  // Could have something here to check for the time when the accesstoken expires

  if (!user.accesstoken) return <div>You need to log in</div>
  return <div>This is the content.</div>;
}

export default Content;