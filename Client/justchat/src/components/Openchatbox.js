import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useChat } from "../context/Chatprovider";
// import Image from "./Image";
// import {useEffect } from "react";
// import useLocalStoragehookfil from "../hooks/useLocalstoragefile";

//       }
//   }, []);

export default function Openchatbox() {
  const { sendmessage, selectedid, chat } = useChat();
  // const [img,setimg]=useLocalStoragehookfil("img",[])

  const [text, settext] = useState("");
  const [file, setfile] = useState();
  const [imgsrc, setsrc] = useState();



  function handlesubmit(e) {
    e.preventDefault();

    if (file) {
    
      sendmessage(selectedid, file);
      setfile("")
    } else {
      sendmessage(selectedid, text);
      console.log(selectedid);
      settext("");
    }
  }

  function uploadfile() {
    const real = document.getElementById("real");

    real.click();
  }

   function updatefile (e) {

    // const a=await URL.createObjectURL(e.target.files[0])
    // setfile(a);
    console.log(file);

    
      var filem = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        console.log('RESULT', reader.result)
        setfile(reader.result)
        console.log(file)
      }
      reader.readAsDataURL(filem);
    }

   
  

  return (
    <>
      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 overflow-auto">
          {chat.map((conv, index) => {
            // const lastMessage = selectedConversation.messages.length - 1 === index
            if (conv.id === selectedid) {
              if (conv.messages.length > 0) {
                return conv.messages.map((message, idx) => {
                  return (
                    <div
                      // ref={lastMessage ? setRef : null}
                      key={idx}
                      className={`my-1 d-flex flex-column me-3   ${
                        message.fromme
                          ? "align-self-end align-items-end"
                          : "align-items-start"
                      }`}
                    >
                      <div
                        className={`rounded px-2 py-1 me-3 ${
                          message.fromme
                            ? "bg-primary text-white"
                            : "border ms-3 "
                        }`}
                      >

                       
                                                
                      {message.file ? 
                      <img  id="preview" src={message.text}  height={200} width={200} />:
                       message.text}
                     
                      </div>
                      <div
                        className={`text-muted small me-3 ${
                          message.fromme ? "text-right" : ""
                        }`}
                      >
                        {message.fromme ? "You" : " "}
                      </div>
                    </div>
                  );
                });
              }
            }
          })}
        </div>
            { file ?
           <div>Click Send to send preview:
          <img id="previewi" alt="not" height={200} width={200} src={file}/> </div>:
                " "

            }

        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e) => settext(e.target.value)}
                style={{ height: "80px", resize: "none" }}
              />

              {/* <input type="file" id="myFile" name="filename" class="fa-solid fa-paperclip fa-1x"></input> */}

              <button
                class="fa-solid fa-paperclip fa-2xl"
                id="fakebutton"
                onClick={uploadfile}
              ></button>
              <input
                type="file"
                name="myfile"
                onChange={updatefile}
                id="real"
                hidden="hidden"
              />

              <Button onClick={handlesubmit}>Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
