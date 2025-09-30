import React, { useEffect, useState } from 'react'
import api from '../../lib/axios'

const DataLoader = ({
  endpoint,
  resourceName,
  children
}) => {
  const [data, setData] = useState();

  useEffect(()=>{
    (
      async ()=>{
        try {
          const {data} = await api.get(`${endpoint}`);
          setData(data)
        } catch (error) {
          console.log(error)
        }
      }
    )()
  },[])

  return data && React.Children.map(children, child=>{
    if(React.isValidElement(child)){
      return React.cloneElement(child, {[resourceName]:data})
    }

    return child
  })
}

export default DataLoader
