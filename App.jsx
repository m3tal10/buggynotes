import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import SignIn from "./components/Auth/signIn"
import SignUp from "./components/Auth/signUp"
import AuthDetails from "./components/Auth/AuthDetails"
import { AuthContext } from "./Context/AuthContext"
import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc,collection } from "firebase/firestore"
import {db } from "./firebase"
export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const sortedNotes= notes.sort((a,b)=> b.updatedAt-a.updatedAt)
    const [tempText,setTempText]= React.useState("")
    const {authUser,setAuthUser}=React.useContext(AuthContext)
    const [userId,setUserId]= React.useState("a")
    const [notesCollection,setNotesCollection] = React.useState(collection(db, userId))
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    React.useEffect(() => {
        if(authUser){const unsubscribe= onSnapshot(notesCollection,(snapshot)=>{
            const notesArray= snapshot.docs.map(doc=>({
                ...doc.data(),
                id:doc.id
            }))
            setNotes(notesArray)
        })
        return unsubscribe}
    }, [notesCollection])
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [])
    React.useEffect(()=>{
        if(currentNote){
            setTempText(currentNote.body)
        }
    },[currentNote])
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
           if(tempText!==currentNote.body) {
            updateNote(tempText)
        }
        }, 500)
        return ()=> clearTimeout(timeoutId)
    },[tempText])
    async function createNewNote() {
        if(authUser){const newNote = {
            body: "# Please erase the line and enter your name or identification or title here in the first line ",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const docRef= await addDoc(notesCollection, newNote)
        const userId= await authUser.email;
        setCurrentNoteId(docRef.id)
        setUserId(userId)
        setNotesCollection(collection(db, userId))
    }
        else alert("Please Login or Sign Up")
    }

    async function updateNote(text) {
        const docRef = doc(db, userId, currentNoteId)
        await setDoc(docRef,{body:text,updatedAt: Date.now()},{merge:true})
    }

    async function deleteNote(noteId) {
        const delRef= doc(db,userId,noteId)
        await deleteDoc(delRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                tempText={tempText}
                                setTempText={setTempText}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                {!authUser&&<div><SignIn/><SignUp/></div>}
                <AuthDetails/>
                    </div>

            }
        </main>
    )
}
