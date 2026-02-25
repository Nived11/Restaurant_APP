import React, { useState } from 'react';
import { Search, Reply, ArrowLeft, Send, Loader2, CheckCircle, UserCheck, ChevronDown, ChevronsUp } from 'lucide-react';
import { useMessage } from '../hooks/useMessage';

const MessagePage = () => {
  const { 
    messages, // Raw messages mapped to UI
    searchQuery, 
    setSearchQuery, 
    hasMore, 
    loadingMore,
    page,
    totalItems, // Extracted from hook for accurate count
    handleSeeMore, 
    handleShowLess, 
    expandedId, 
    isLoading, 
    error, 
    toggleMessage, 
    sendReply 
  } = useMessage();

  const [mobileViewMsg, setMobileViewMsg] = useState(null);
  
  // --- REPLY STATES ---
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // --- REAL SEND LOGIC (API CALL) ---
  const handleSendReply = async (msgId) => {
    if (!replyText.trim()) return;
    
    setIsSending(true);
    const isSuccess = await sendReply(msgId, replyText);
    setIsSending(false);

    if (isSuccess) {
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setShowReplyBox(false);
        setReplyText("");
        
        // Update mobile view state if it's currently open
        if(mobileViewMsg) {
          setMobileViewMsg(prev => ({ ...prev, reply_message: replyText, replied_at: new Date().toISOString() }));
        }
      }, 1500);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  // ✅ SKELETON COMPONENTS
  const MobileSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-2.5 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mt-3"></div>
        </div>
      ))}
    </div>
  );

  const DesktopSkeleton = () => (
    <div className="divide-y divide-gray-50">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center animate-pulse">
          <div className="col-span-3 flex items-center gap-4 pl-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
            <div className="space-y-2 w-full pr-4">
              <div className="h-3.5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="col-span-6 pr-4 space-y-2.5">
            <div className="h-3.5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-2.5 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="col-span-3 flex justify-end pr-4">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

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
                    {mobileViewMsg.full_name?.charAt(0) || "U"}
                 </div>
                 <div className="min-w-0">
                    <h3 className="font-bold text-base truncate">{mobileViewMsg.full_name}</h3>
                    <p className="text-sm text-gray-500 truncate">{mobileViewMsg.email}</p>
                 </div>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl text-gray-800 text-base leading-relaxed whitespace-pre-wrap border border-gray-100 shadow-sm">
                 {mobileViewMsg.message}
              </div>

              {/* SHOW REPLY FROM BACKEND IF EXISTS */}
              {mobileViewMsg.reply_message && (
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase tracking-wider">
                        <UserCheck size={14}/> Your Reply
                      </div>
                      <span className="text-[9px] text-emerald-600/70 font-bold">{formatDate(mobileViewMsg.replied_at)}</span>
                   </div>
                   <p className="text-sm text-emerald-900 leading-relaxed italic">"{mobileViewMsg.reply_message}"</p>
                </div>
              )}

              {/* MOBILE REPLY TEXT BOX */}
              {showReplyBox && !mobileViewMsg.reply_message && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                   <textarea 
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                     placeholder="Write your reply here..."
                     className="w-full p-4 bg-white border-2 border-[#f9a602] rounded-2xl outline-none min-h-[150px] text-sm font-medium shadow-sm"
                   />
                   <button 
                     onClick={() => handleSendReply(mobileViewMsg.id)} 
                     disabled={isSending || isSent}
                     className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${isSent ? 'bg-green-500 text-white' : 'bg-black text-[#f9a602]'}`}
                   >
                      {isSending ? <Loader2 className="animate-spin" size={20}/> : isSent ? <><CheckCircle size={20}/> SENT SUCCESSFULLY</> : <><Send size={18}/> SEND REPLY</>}
                   </button>
                </div>
              )}
           </div>
           
           {!showReplyBox && !isSent && !mobileViewMsg.reply_message && (
             <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
                <button onClick={() => setShowReplyBox(true)} className="w-full py-3 rounded-xl bg-[#0A0A0A] text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
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
            <p className="text-xs text-gray-500">Showing <span className="font-bold text-[#f9a602]">{totalItems}</span> messages</p>
          </div>
          <div className="relative mb-5">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 py-2 bg-white rounded-xl border-none shadow-sm text-sm outline-none focus:ring-1 focus:ring-[#f9a602]/30"
            />
          </div>
          
          {isLoading && page === 1 ? (
            <MobileSkeleton />
          ) : error ? (
            <div className="p-5 text-center text-red-500">{error}</div>
          ) : messages.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              {searchQuery ? "No matching messages found." : "No messages found."}
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {messages.map((msg) => (
                 <div key={msg.id} onClick={() => setMobileViewMsg(msg)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer relative overflow-hidden">
                    {/* Indicator if replied */}
                    {msg.reply_message && <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-bl-lg"></div>}
                    
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#f9a602] text-black`}>
                          {msg.full_name?.charAt(0) || "U"}
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm truncate">{msg.full_name}</h4>
                          <p className="text-[10px] text-gray-400">{formatDate(msg.created_at)}</p>
                       </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{msg.subject}</p>
                 </div>
              ))}

              {/* API PAGINATION BUTTONS */}
              {(hasMore || page > 1) && (
                <div className="flex flex-col gap-3 pt-4">
                  {hasMore && (
                    <button onClick={handleSeeMore} disabled={loadingMore} className="w-full py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50">
                      {loadingMore ? <Loader2 size={14} className="animate-spin" /> : <>See More <ChevronDown size={14} /></>}
                    </button>
                  )}
                  {page > 1 && !loadingMore && (
                    <button onClick={handleShowLess} className="w-full py-3 bg-white text-[#0A0A0A] border border-gray-200 text-[10px] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform">
                      <ChevronsUp size={14} /> Show Less
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
      </div>
      )}

      {/* 💻 2. DESKTOP VIEW */}
      <div className="hidden md:block p-10 max-w-7xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-4xl font-black text-[#0A0A0A] tracking-tight">INB<span className='text-[#f9a602]'>OX.</span></h1>
               <p className="text-sm text-gray-500 mt-1">Showing <span className="font-bold text-[#f9a602]">{totalItems}</span> messages</p>
            </div>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f9a602] transition-colors" size={18}/>
               <input 
                 type="text" 
                 placeholder="Search by name or email..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-12 pr-4 py-3 w-80 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f9a602]/20 focus:border-[#f9a602] transition-all text-sm font-medium"
               />
            </div>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
               <div className="col-span-3 pl-2">Sender</div>
               <div className="col-span-6">Subject & Preview</div>
               <div className="col-span-3 text-right pr-4">Date</div>
            </div>
            
            {isLoading && page === 1 ? (
              <DesktopSkeleton />
            ) : error ? (
              <div className="p-10 text-center text-red-500 font-bold">{error}</div>
            ) : messages.length === 0 ? (
              <div className="p-20 text-center text-gray-400 font-bold text-lg">
                {searchQuery ? "No matching messages found." : "No messages found."}
              </div>
            ) : (
            <div className="divide-y divide-gray-50">
               {messages.map((msg) => (
                  <div key={msg.id} className="group bg-white hover:bg-gray-50/50">
                     <div onClick={() => { toggleMessage(msg.id); setShowReplyBox(false); }} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer relative transition-all duration-300 ${expandedId === msg.id ? 'bg-[#f9a602]/5' : ''}`}>
                        {expandedId === msg.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f9a602]"></div>}
                        <div className="col-span-3 flex items-center gap-4 pl-2">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-[#0A0A0A] text-white relative`}>
                              {msg.full_name?.charAt(0) || "U"}
                              {/* Indicator if replied */}
                              {msg.reply_message && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                           </div>
                           <div className="min-w-0">
                              <h4 className={`text-sm truncate font-medium text-gray-700`}>{msg.full_name}</h4>
                              <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                           </div>
                        </div>
                        <div className="col-span-6 pr-4">
                           <div className="flex items-center gap-2">
                              <span className={`text-sm truncate font-medium text-gray-600`}>{msg.subject}</span>
                           </div>
                           <p className="text-xs text-gray-400 truncate mt-0.5 max-w-md">{msg.message}</p>
                        </div>
                        <div className="col-span-3 text-right pr-4">
                           <span className={`text-xs font-medium text-gray-400`}>{formatDate(msg.created_at)}</span>
                        </div>
                     </div>
                     
                     <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedId === msg.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                           <div className="bg-gray-50/50 border-t border-gray-100 px-20 py-8">
                              <div className="flex justify-between items-start mb-6">
                                 <h2 className="text-xl font-black text-[#0A0A0A]">{msg.subject}</h2>
                                 
                                 {/* HIDE REPLY BUTTON IF ALREADY REPLIED */}
                                 {!showReplyBox && !msg.reply_message && (
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

                              {/* SHOW REPLY FROM BACKEND IF EXISTS */}
                              {msg.reply_message && (
                                <div className="mb-6 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in slide-in-from-left-4 duration-500">
                                   <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase tracking-widest">
                                        <UserCheck size={16}/> Your Official Reply
                                      </div>
                                      <span className="text-[10px] text-emerald-600/70 font-bold tracking-tight">{formatDate(msg.replied_at)}</span>
                                   </div>
                                   <p className="text-sm text-emerald-900 italic font-medium leading-relaxed">"{msg.reply_message}"</p>
                                </div>
                              )}

                              {/* SHOW TEXT BOX ONLY IF NOT REPLIED YET */}
                              {showReplyBox && !msg.reply_message && (
                                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                                   <div className="relative">
                                      <textarea 
                                        autoFocus
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder={`Send a reply to ${msg.full_name}...`}
                                        className="w-full p-6 bg-white border-2 border-[#f9a602] rounded-3xl outline-none min-h-[180px] text-sm font-medium shadow-xl shadow-yellow-500/10"
                                      />
                                      <div className="absolute bottom-4 right-4 flex gap-2">
                                         <button onClick={() => setShowReplyBox(false)} className="px-5 py-2.5 text-xs font-bold text-gray-400 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                         <button 
                                           onClick={() => handleSendReply(msg.id)}
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

               {/* API PAGINATION BUTTONS */}
               {(hasMore || page > 1) && (
                 <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-100 bg-gray-50/30">
                    {hasMore && (
                      <button onClick={handleSeeMore} disabled={loadingMore} className="flex items-center gap-2 px-8 py-3 bg-[#0A0A0A] text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#f9a602] hover:text-[#0A0A0A] transition-all shadow-xl active:scale-95 disabled:opacity-50">
                        {loadingMore ? <Loader2 size={14} className="animate-spin" /> : <>See More <ChevronDown size={14} /></>}
                      </button>
                    )}
                    {page > 1 && !loadingMore && (
                      <button onClick={handleShowLess} className="flex items-center gap-2 px-8 py-3 bg-white text-[#0A0A0A] border-2 border-[#f9a602] text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#f9a602] transition-all active:scale-95">
                        <ChevronsUp size={14} /> Show Less
                      </button>
                    )}
                 </div>
               )}
            </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MessagePage;