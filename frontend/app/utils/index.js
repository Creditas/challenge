'use strict';
 
 const uidGenerator = () => {
   let rn = () => {
     return Math.floor((1 + Math.random()) * 0x10000)
       .toString(15)
       .substring(1);
   };
 
   return 'chat-' + rn() + rn() + '-' + rn() + '-' + rn(); 
 };

 const detectEnterKey = (evt) => {
   if (evt) {}
 }
 
 export { uidGenerator };