import React, { Suspense } from 'react'
import PostInfo from './components/PostInfo'

function App() {
  return (
    <div className="App">
    <Suspense fallback={<></>}>
      <PostInfo/>
      </Suspense>
    </div>
  );
}

export default App;
