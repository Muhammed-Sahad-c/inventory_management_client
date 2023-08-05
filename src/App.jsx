import { samleReq } from "./services/UserAuthentication"

function App() {
  const fn = async () => {
    const test = await samleReq();
    console.log(test.data)
  }

  fn();
  return (
    <>
      <h1>this is sahad</h1>
    </>
  )
}

export default App
