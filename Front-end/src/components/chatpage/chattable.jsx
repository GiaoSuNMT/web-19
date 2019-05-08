import React, { Component } from 'react';
import firebase, { initializeApp } from 'firebase/app'
import 'firebase/firestore'
class ChatTable extends Component {
    state = {
        message: "",
        id: 0,
        conversationId: "",
        messages: new Array(),
        conversation: new Array(),
        checkFriend: false,
        chooseId : null,
    }

    async componentDidMount() {
        await this.loadConversations();
        //handleGetMessage={this.props.handleGetMessage
    }

    loadConversations = async () => {
        const db = firebase.firestore();
        let conversations = undefined;
        let activeConversation = undefined;
        if(this.props.state._id){
        await db.collection('conversations').where("users", "array-contains", this.props.state._id)
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

                        await this.setState({
                            conversationId: activeConversation.id
                        })

                        await this.setState({
                            messages: activeConversation.messages,
                            conversation: conversations,
                            id: conversations.length
                        })

                    }
                }
                for(let i=0;i<this.state.conversation.length;++i){
                    if(this.state.conversation[i].users.indexOf(this.props.state.friendId) > -1){
                        await this.setState({
                            checkFriend : true
                        });
                        break
                    }
                }
                if(!this.state.checkFriend) this.newConversation();
                this.props.handleGetMessage(this.state.conversation);
                console.log(this.state)
            });
        }
    };
    handleChangeInput = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    addMessage = async (newMessage,id) => {
        const db = firebase.firestore();
        db.collection('conversations').doc(id).update({
            messages: firebase.firestore.FieldValue.arrayUnion(newMessage),
        });
    };


    handleClick = (id) => {
        const newMessage = {
            content: this.state.message,
            user: this.props.state._id,
            createdAt: new Date().toISOString(),
        };
        if (newMessage.content) {
            this.addMessage(newMessage , id);
            this.setState({
                message: ""
            })
        }

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

    handleClickUser = async (id) => {
        console.log(this.props.state.chooseId);
        // let index;
        // let itemId;
        // if(this.state.conversation && id){
        //     for(let i=0;i<this.state.conversation.length;++i){
        //         if(this.state.conversation[i].users.indexOf(this.props.state.chooseId) > -1){
        //             index = i;
        //             itemId = this.state.conversation[i].id;
        //             break
        //         }
        //     }
        //     await this.setState({
        //         chooseId : id,
        //         id: index,
        //         conversationId: itemId
        //     })
        //     console.log(this.state)
        //     this.loadConversations();
        // }
    }

    createConversation = (conversationInfo) => {
        if (conversationInfo.conversationName && conversationInfo.friendEmail) {
            const newConversation = {
                name: conversationInfo.conversationName,
                users: [conversationInfo.friendEmail, this.props.state._id],
                messages: [],
                createdAt: new Date().toISOString(),
            };

            const db = firebase.firestore();
            db.collection('conversations').add(newConversation);
            this.loadConversations();
        }
    }

    newConversation = async () => {
        const conversationName = "newConversation";
        const friendEmail = this.props.state.friendId;
        if(!this.state.checkFriend){
        this.createConversation({
            conversationName,
            friendEmail,
        });
        await this.setState({
            checkFriend : true
        })
        }

    }

    render() {

        return (

            <div className='chat-container col-12 mx-auto'>
            
                {this.state.conversation ?
                    <div className='main mt-3'>
                            {this.state.conversation.map((item, index) => {
                                
                               if(item.users.indexOf(this.props.state.chooseId) !== -1)
                                return (
                                    <div key={index} className='conversation-detail'>
                                    <div id='conversation-name' className='conversation-header'>
                                    </div>
                                    <div className='conversation-messages scrollbar' id='conversation-messages'>
                                        {item.messages.map((message, index) => {
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
                                        <input onChange={this.handleChangeInput} value={this.state.message} id='message-input' name='message' placeholder='Aa' className="col-8 mx-auto mt-3"></input>
                                        <button onClick={()=>{return this.handleClick(item.id)}} type='submit' value="Gửi" className="btn mt-4 mx-auto">Gửi</button>
                                    </div>
        
                                </div>
                                )
                            })}
                    </div>
                    : <h1 className="text-center"> Chưa có cuộc trò chuyện nào </h1>
                }

            </div >


        );
    }
}

export default ChatTable;