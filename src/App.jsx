import { useMemo, useRef, useState } from "react"

function App() {
  const [items, setItems] = useState([]) //init as empty array
  const [query, setQuery] = useState("") //init state for search query
  const inputRef = useRef() //new item input ref

  const filteredItems = useMemo(() => { //useMemo ensures that this only runs when items or query are changed
    return items.filter(item => { //filter items
      return item.toLowerCase().includes(query.toLowerCase()) //check if item includes query and return
    })
  }, [items, query]) //parameters to monitor for change to run useMemo

  function onSubmit(e) { //handle submit for form
    e.preventDefault() //prevent reload

    const value = inputRef.current.value //get value of input for newitem by reference
    if (value === "") return // return if empty

    setItems(prev => { // call usestate hook to add item to previous items
      return [...prev, value] // return prev items with new item added to the end
    })

    inputRef.current.value = "" //reset input element val (add input)
  }

  return (
    <>
      Search:
      <input
        value={query}
        onChange={e => setQuery(e.target.value)} //call state hook to set query
        type="search"
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map(item => ( // map over every element in array and return div
        // eslint-disable-next-line react/jsx-key
        <div>{item}</div>
      ))}
    </>
  )
}

export default App