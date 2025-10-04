import './App.css'

function App({firstName = '', lastName = ''}) {
  // by default props is used for passing data from component to component
  // but here we are using object destructuring to get the values of firstName and lastName

  return (
    <>
      {firstName && (
        <h1 className='text-3xl font-bold underline bg-blue-400'>Greeting, {firstName} {lastName}</h1>
      )}
    </>
  )
}

export default App
