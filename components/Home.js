import React, {useState, useEffect} from "react";
import Header from "./Header";
import ListItems from "./Listitems";
import InputModal from './InputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({todos, setTodos}) => {

   

    

    //Modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputValue, setTodoInputValue] = useState();

    //function to add a new todo

    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];
       
        AsyncStorage.setItem("storedTodos", JSON.stringify([newTodos])).then(() => {
            setTodos(newTodos);
            setModalVisible(false);
        }).catch(error => console.log(error));
    };

    //editing

    const [todoToBeEdited, setTodoToBeEdited] = useState(null);
    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        setTodoInputValue(item.title);
    };

    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);

        AsyncStorage.setItem("storedTodos", JSON.stringify([newTodos])).then(() => {
            setTodos(newTodos);
            setModalVisible(false);
            setTodoToBeEdited(null);
        }).catch((error) => console.log(error));
    };

    //clear all todos 
    const handleClearTodos = () => {
        
        AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() => {
           setTodos([]);
        }).catch((error) => console.log(error));
    };

    return(
        <>
        <Header handleClearTodos={handleClearTodos}/>
        <ListItems
        todos={todos}
        setTodos={setTodos}
        handleTriggerEdit={handleTriggerEdit}
         />
         <InputModal
             todoInputValue={todoInputValue}
             setTodoInputValue={setTodoInputValue}
             modalVisible={modalVisible}
             setModalVisible={setModalVisible}
             handleAddTodo={handleAddTodo}
             todoToBeEdited={todoToBeEdited}
             setTodoToBeEdited={setTodoToBeEdited}
             handleEditTodo={handleEditTodo}
             todos={todos}
         />
        </>

    );
};

export default Home;