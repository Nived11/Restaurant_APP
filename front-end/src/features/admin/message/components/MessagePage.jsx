import React, { useState } from 'react';
import { Search, Trash2, Reply, AlertCircle, ArrowLeft, Send, Loader2, CheckCircle, UserCheck } from 'lucide-react';
import { useMessage } from '../hooks/useMessage';

const MessagePage = () => {
  const { messages, expandedId, toggleMessage, deleteMessage } = useMessage();
  const [deleteId, setDeleteId] = useState(null);
  const [mobileViewMsg, setMobileViewMsg] = useState(null);
  
  // --- REPLY STATES ---
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [sentReplies, setSentReplies] = useState({});

  const confirmDelete = () => {
    if (deleteId) {
       deleteMessage(deleteId);
       setDeleteId(null);
       setMobileViewMsg(null);
    }
  };

  // --- ANIMATED SEND LOGIC (Updated to save reply) ---
  const handleSendAnimation = (msgId) => {
    if (!replyText.trim()) return;
    
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      setSentReplies(prev => ({
        ...prev,
        [msgId]: {
          text: replyText,
          date: "Just now"
        }
      }));
      
      setTimeout(() => {
        setIsSent(false);
        setShowReplyBox(false);
        setReplyText("");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans text-[#0A0A0A]">
      
      {/* 📱 MOBILE VIEW OVERLAY */}
      {mobileViewMsg && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-300 ease-out">
           <div className="flex items-center gap-4 p-4 border-b border-gray-100 sticky top-0 bg-white">
              <button onClick={() => { setMobileViewMsg(null); setShowReplyBox(false); }} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ArrowLeft size={24} className="text-[#0A0A0A]"/>
              </button>
              <h2 className="text-lg font-black truncate">Message Detail</h2>
           </div>
           
           <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <h1 className="text-xl font-black mb-6 leading-tight text-[#0A0A0A]">{mobileViewMsg.subject}</h1>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-[#f9a602] text-black flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
                    {mobileViewMsg.fullName.charAt(0)}
                 </div>
                 <div className="min-w-0">
                    <h3 className="font-bold text-base truncate">{mobileViewMsg.fullName}</h3>
                    <p className="text-sm text-gray-500 truncate">{mobileViewMsg.email}</p>
                 </div>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl text-gray-800 text-base leading-relaxed whitespace-pre-wrap border border-gray-100 shadow-sm">
                 {mobileViewMsg.message}
              </div>

              {sentReplies[mobileViewMsg.id] && (
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-center gap-2 mb-2 text-emerald-700 font-black text-[10px] uppercase tracking-wider">
                      <UserCheck size={14}/> Your Reply
                   </div>
                   <p className="text-sm text-emerald-900 leading-relaxed italic">"{sentReplies[mobileViewMsg.id].text}"</p>
                </div>
              )}

              {/* ✅ MOBILE REPLY TEXT BOX */}
              {showReplyBox && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                   <textarea 
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                     placeholder="Write your reply here..."
                     className="w-full p-4 bg-white border-2 border-[#f9a602] rounded-2xl outline-none min-h-[150px] text-sm font-medium shadow-sm"
                   />
                   <button 
                     onClick={() => handleSendAnimation(mobileViewMsg.id)}
                     disabled={isSending || isSent}
                     className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${isSent ? 'bg-green-500 text-white' : 'bg-black text-[#f9a602]'}`}
                   >
                      {isSending ? <Loader2 className="animate-spin" size={20}/> : isSent ? <><CheckCircle size={20}/> SENT SUCCESSFULLY</> : <><Send size={18}/> SEND REPLY</>}
                   </button>
                </div>
              )}
           </div>
           
           {!showReplyBox && !isSent && (
             <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
                <button onClick={() => setDeleteId(mobileViewMsg.id)} className="flex-1 py-3 rounded-xl border border-red-100 text-red-500 font-bold flex items-center justify-center gap-2 transition-colors">
                   <Trash2 size={18}/> Delete
                </button>
                <button onClick={() => setShowReplyBox(true)} className="flex-1 py-3 rounded-xl bg-[#0A0A0A] text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                   <Reply size={18}/> Reply
                </button>
             </div>
           )}
        </div>
      )}

      {/* 📱 1. MOBILE LIST VIEW */}
      {!mobileViewMsg && (
      <div className="md:hidden p-5">
          <div className="mb-5">
            <h1 className="text-2xl font-black text-[#0A0A0A]">INB<span className='text-[#f9a602]'>OX.</span></h1>
            <p className="text-xs text-gray-500">Showing <span className="font-bold text-[#f9a602]">{messages.length}</span> messages</p>
          </div>
          <div className="relative mb-5">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
            <input type="text" placeholder="Search..." className="w-full pl-10 py-2 bg-white rounded-xl border-none shadow-sm text-sm outline-none focus:ring-1 focus:ring-[#f9a602]/30"/>
          </div>
          <div className="space-y-3">
            {messages.map((msg) => (
               <div key={msg.id} onClick={() => setMobileViewMsg(msg)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${!msg.isRead ? 'bg-[#f9a602] text-black' : 'bg-gray-100 text-gray-500'}`}>
                        {msg.fullName.charAt(0)}
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{msg.fullName}</h4>
                        <p className="text-[10px] text-gray-400">{msg.date}</p>
                     </div>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.subject}</p>
               </div>
            ))}
          </div>
      </div>
      )}

      {/* 💻 2. DESKTOP VIEW */}
      <div className="hidden md:block p-10 max-w-7xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tight">INB<span className='text-[#f9a602]'>OX.</span></h1>
               <p className="text-sm text-gray-500 mt-1">Showing <span className="font-bold text-[#f9a602]">{messages.length}</span> messages</p>
            </div>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors" size={18}/>
               <input type="text" placeholder="Search messages..." className="pl-12 pr-4 py-3 w-80 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f9a602]/20 focus:border-[#f9a602] transition-all text-sm font-medium"/>
            </div>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
               <div className="col-span-3 pl-2">Sender</div>
               <div className="col-span-6">Subject & Preview</div>
               <div className="col-span-2 text-right">Date</div>
               <div className="col-span-1 text-center">Action</div>
            </div>
            <div className="divide-y divide-gray-50">
               {messages.map((msg) => (
                  <div key={msg.id} className="group bg-white hover:bg-gray-50/50">
                     <div onClick={() => { toggleMessage(msg.id); setShowReplyBox(false); }} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer relative transition-all duration-300 ${expandedId === msg.id ? 'bg-[#f9a602]/5' : ''}`}>
                        {expandedId === msg.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f9a602]"></div>}
                        <div className="col-span-3 flex items-center gap-4 pl-2">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${!msg.isRead ? 'bg-[#0A0A0A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              {msg.fullName.charAt(0)}
                           </div>
                           <div className="min-w-0">
                              <h4 className={`text-sm truncate ${!msg.isRead ? 'font-bold text-[#0A0A0A]' : 'font-medium text-gray-700'}`}>{msg.fullName}</h4>
                              <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                           </div>
                        </div>
                        <div className="col-span-6 pr-4">
                           <div className="flex items-center gap-2">
                              <span className={`text-sm truncate ${!msg.isRead ? 'font-bold text-[#0A0A0A]' : 'font-medium text-gray-600'}`}>{msg.subject}</span>
                              {!msg.isRead && <span className="w-2 h-2 rounded-full bg-[#f9a602]"></span>}
                           </div>
                           <p className="text-xs text-gray-400 truncate mt-0.5 max-w-md">{msg.message}</p>
                        </div>
                        <div className="col-span-2 text-right">
                           <span className={`text-xs ${!msg.isRead ? 'font-bold text-[#0A0A0A]' : 'font-medium text-gray-400'}`}>{msg.date}</span>
                        </div>
                        <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={(e) => { e.stopPropagation(); setDeleteId(msg.id); }} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={18} />
                           </button>
                        </div>
                     </div>
                     
                     {/* ✨ DESKTOP EXPANDED VIEW WITH ANIMATED REPLY BOX */}
                     <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedId === msg.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                           <div className="bg-gray-50/50 border-t border-gray-100 px-20 py-8">
                              <div className="flex justify-between items-start mb-6">
                                 <h2 className="text-xl font-black text-[#0A0A0A]">{msg.subject}</h2>
                                 {!showReplyBox && (
                                   <button 
                                      onClick={() => setShowReplyBox(true)} 
                                      className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-xs font-bold shadow-lg hover:bg-[#f9a602] hover:text-black transition-all active:scale-95"
                                   >
                                      <Reply size={14}/> Reply Now
                                   </button>
                                 )}
                              </div>
                              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                                 {msg.message}
                              </div>

                              {sentReplies[msg.id] && (
                                <div className="mb-6 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in slide-in-from-left-4 duration-500">
                                   <div className="flex items-center gap-2 mb-3 text-emerald-700 font-black text-[10px] uppercase tracking-widest">
                                      <UserCheck size={16}/> Your Official Reply
                                   </div>
                                   <p className="text-sm text-emerald-900 italic font-medium leading-relaxed">"{sentReplies[msg.id].text}"</p>
                                   <p className="text-[10px] text-emerald-600/50 mt-2 font-bold tracking-tight">{sentReplies[msg.id].date}</p>
                                </div>
                              )}

                              {/* ✅ DESKTOP REPLY TEXT BOX */}
                              {showReplyBox && (
                                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                                   <div className="relative">
                                      <textarea 
                                        autoFocus
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder={`Send a reply to ${msg.fullName}...`}
                                        className="w-full p-6 bg-white border-2 border-[#f9a602] rounded-3xl outline-none min-h-[180px] text-sm font-medium shadow-xl shadow-yellow-500/10"
                                      />
                                      <div className="absolute bottom-4 right-4 flex gap-2">
                                         <button onClick={() => setShowReplyBox(false)} className="px-5 py-2.5 text-xs font-bold text-gray-400 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                         <button 
                                           onClick={() => handleSendAnimation(msg.id)}
                                           disabled={isSending || isSent}
                                           className={`px-8 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${isSent ? 'bg-green-500 text-white' : 'bg-black text-[#f9a602] hover:scale-105 shadow-lg active:scale-95'}`}
                                         >
                                            {isSending ? <Loader2 className="animate-spin" size={16}/> : isSent ? <><CheckCircle size={16}/> SENT</> : <><Send size={16}/> SEND EMAIL</>}
                                         </button>
                                      </div>
                                   </div>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* 🛑 DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                 <AlertCircle size={28} />
              </div>
              <h3 className="text-xl font-black text-center mb-2 text-[#0A0A0A]">Delete Message?</h3>
              <p className="text-center text-gray-500 text-sm mb-8 font-medium">Are you sure? This action cannot be undone.</p>
              <div className="flex gap-3">
                 <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                 <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200 transition-colors">Delete</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;