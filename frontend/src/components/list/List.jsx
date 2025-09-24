import React from 'react'

const List = ({
    items, 
    resourceName,
    itemComponent: ItemComponent
}) => {
  return (
    <>
      {items.map((item,i)=>(
        <ItemComponent 
        key={i}
        {...{
            [resourceName]:item
        }}/>
        // same as resourceName:{item}
      ))}
    </>
  )
}

export default List
