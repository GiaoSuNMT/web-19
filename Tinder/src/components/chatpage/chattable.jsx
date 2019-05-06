import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'


class ChatTable extends Component {
  state = {
    message: "",
    id: 0,
    conversationId: "",
    messages: new Array(),
    conversation: new Array(),
  }

  componentDidMount() {
    this.loadConversations();
  }

  loadConversations = async () => {
    const db = firebase.firestore();
    let conversations = undefined;
    let activeConversation = undefined;
    db.collection('conversations').where("users", "array-contains", "dangtai380@gmail.com")
      .onSnapshot(async (snapShot) => {
        if (conversations === undefined) {
          conversations = snapShot.docChanges().map((item) => ({
            id: item.doc.id,
            ...item.doc.data(),
          }));
          //  console.log(conversations[0].messages)
          activeConversation = conversations[this.state.id];
          
          
            await this.setState({
              conversationId: activeConversation.id
            })
          
          
          await this.setState({
            messages: activeConversation.messages,
            conversation: conversations,
            id: this.state.id,
          })
          
          
          
          // for (let conversation of model.conversations) {
          //   view.addConversation(conversation);
          // }

          // for (let message of activeConversation.messages) {
          //   view.addMessage(message);
          // }
          
        } else {
          

          for (const item of snapShot.docChanges()) {
            const conversation = {
              id: item.doc.id,
              ...item.doc.data(),
            };
            for (let i = 0; i < conversations.length; i += 1) {
              if (conversations[i].id === conversation.id) {
                conversations[i] = conversation;
              }
            }

            if (conversation.id === activeConversation.id) {
              activeConversation = conversation;
              //   view.addMessage(conversation.messages[conversation.messages.length - 1]);
            }
            
            this.setState({
                conversationId: activeConversation.id
            })
            
            this.setState({
              messages: activeConversation.messages,
              conversation: conversations,
              id: conversations.length
            })
            
          }
        }

      });
  };


  handleChangeInput = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  addMessage = async (newMessage) => {
    const db = firebase.firestore();

    db.collection('conversations').doc(this.state.conversationId).update({
      messages: firebase.firestore.FieldValue.arrayUnion(newMessage),
    });
  };


  handleClick = (e) => {
    const newMessage = {
      content: this.state.message,
      user: this.props.state._id,
      createdAt: new Date().toISOString(),
    };
    this.addMessage(newMessage);
    this.setState({
      message: ""
    })
  }

  UserMessage = (message) => {
    return (
      <div className='mesage-container'>
        <div className='your'>
          <span className='message'>{message.content}</span>
        </div>
      </div>

    );
  }
  GuMessage = (message) => {
    return (
      <div className='mesage-container'>
        <div className='sender'>{message.user}</div>
        <div className='message'>
          {message.content}
        </div>
      </div>
    );
  }

  handleClickUser = (index,itemId) => {
    
    this.setState({
      id: index,
      conversationId: itemId
    })
    this.loadConversations();
  }

  createConversation = (conversationInfo) => {
    if (conversationInfo.conversationName && conversationInfo.friendEmail) {
      const newConversation = {
        name: conversationInfo.conversationName,
        users: [conversationInfo.friendEmail,"dangtai380@gmail.com" ],
        messages: [],
        createdAt: new Date().toISOString(),
      };
    
      const db = firebase.firestore();
      db.collection('conversations').add(newConversation);
      this.loadConversations();
    }
  }

  newConversation = () => {
    const conversationName = "newConversation";
      const friendEmail = "yoyoyo@gmail.com"
    this.createConversation({
      conversationName,
          friendEmail,
    });
    
  }

  render() {
    return (

      <div className='chat-container'>
        
        <div className='main'>
          <div className='conversation-list' id='conversation-list'>
            <div className='create-conversation'>
              <button onClick={this.newConversation} id='create-conversation' className='btn btn-primary'> + New Conversation</button>
            </div>
            {this.state.conversation.map((item, index) => {
                
                return (
                  <div key={index}>

                    {
                      <span onClick={()=>{return this.handleClickUser(index, item.id)}} >{item.users[0]}</span>
                    }

                  </div>

                )
              })}
          </div>

          <div className='conversation-detail'>
            <div id='conversation-name' className='conversation-header'>
            </div>
            <div className='conversation-messages' id='conversation-messages'>
              {this.state.messages.map((message, index) => {
                // console.log(message.user, this.props.state._id);
                return (
                  <div key={index}>

                    {

                      message.user === this.props.state._id ? this.UserMessage(message) : this.GuMessage(message)
                    }

                  </div>

                )
              })}
            </div>

            <div className='conversation-input'>
              <input onChange={this.handleChangeInput} value={this.state.message} id='message-input' name='message' placeholder='Type a message ...'></input>
              <button onClick={this.handleClick} className='button' type='submit'>Send</button>
            </div>

          </div>
        </div>
      </div>


    );
  }
}

export default ChatTable;
