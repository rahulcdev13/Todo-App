import React from 'react'
import { useState , useEffect} from 'react'
import './Todo.css'

const getLocalItems = ()=>{
    let list = localStorage.getItem('Lists')
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('Lists'))
    } else {
        return []
    }
}


const Todo = () => {
    const [inputData, setinputData] = useState('');
    const [addItem, setaddItems] = useState(getLocalItems());
    const [toggle,setToggle] = useState(true);
    const [iseditItem,setIsEditItem] =useState(null)

    const addItems = () => {
        if (!inputData) {
        }else if(inputData && !toggle){
            setaddItems( 
                addItem.map((elm)=>{
                    if (elm.id === iseditItem) {
                        return{...elm,name: inputData}
                    }
                    return elm;
                })
            )
            setToggle(true)
            setinputData('') 
            setIsEditItem(null)
        } 
        else {
            const allinputData = { id: new Date().getTime().toString(), name: inputData }
            setaddItems([...addItem, allinputData])
            // console.log(allinputData);
            setinputData('')
        }
    }
    const deleteitem = (index) => {
        // console.log(index);
        const updateItems = addItem.filter((elment) => {
            return index !== elment.id;
        })
        setaddItems(updateItems)
    }
    const edititem = (id) => {
        const newEditItems = addItem.find((elment) => {
            return elment.id === id;
        })
        setToggle(false)
        setinputData(newEditItems.name)
        // console.log(newEditItems); 
        setIsEditItem(id)
    }
    // console.log(addItem);
useEffect(() => {
   localStorage.setItem('Lists',JSON.stringify(addItem)) 
}, [addItem])


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <span className='todoLogo'> 📝 </span>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍ Add your item..'
                            value={inputData}
                            onChange={(event) => { setinputData(event.target.value) }} />
                            {
                            toggle ? <i className='fa fa-plus add-btn' title='Add item' onClick={addItems}></i> : <i className='far fa-edit add-btn' title='edit item' onClick={addItems}></i>
                            }
                        
                    </div>
                    {
                        addItem.map((showdata) => {
                            return (
                                <>
                                    <div className='showItems' key={showdata.id}>
                                        <div className='eachItem'>
                                            <h3>{showdata.name}</h3>
                                            <div className='todo-btn'>
                                                <i className='far fa-edit add-btn' onClick={() => { edititem(showdata.id) }} title='edit item'></i>
                                                <i className='far fa-trash-alt add-btn' onClick={() => { deleteitem(showdata.id) }} title='delete item'></i>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                    {/* Clear all items */}
                    <div className='showItems'>
                        <button className='btn effect04' onClick={() => { setaddItems([]) }} data-sm-link-text="Remove All"><span style={{ color: "white" }}>Check list</span></button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo