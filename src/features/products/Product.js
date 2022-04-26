import React from 'react'
import styles from './Product.module.css'
import { useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from 'react'
import { addListProduct, deleteProduct, getListProduct } from './productSlice'

export default function Product() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const disPatch = useDispatch()
  const dataProduct = useSelector(state => state?.productReducer?.data)
  console.log(dataProduct);

  useEffect(() => {
    disPatch(getListProduct())
  }, []);
  return (
    <div>
        <h1 className={styles.title}>Title</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <button onClick={async() => {await disPatch(addListProduct({name, price})).unwrap(); disPatch(getListProduct())}}>Add list product</button>
        <p>List product</p>
        {dataProduct.map((item, index) => (
          <p key={item.id}>{item.name} <button onClick={async() => {await disPatch(deleteProduct(item.id))}}>Xoa</button></p>
          
        ))}
    </div>
  )
}
