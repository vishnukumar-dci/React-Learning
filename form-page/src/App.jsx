import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Form } from "./component/Form/Form"
import { Product} from "./component/Product"
import { UserList } from "./component/List/UserList";
import { ProductList } from "./component/List/ProductList";

function  App(){
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Form/>}></Route>
        <Route path="/product" element={<Product/>}/>
        <Route path="/list" element={<UserList/>}/>
        <Route path="/items" element={<ProductList/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
