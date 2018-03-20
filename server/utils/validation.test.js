const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');

describe('isrealString', ()=>{
   it('should reject non-string values', ()=>{
    var res= isRealString(98);
    expect(res).toBe(false);
   });

   it('should reject string with only spaces',()=>{
       var res = isRealString('    ');
       expect(res).toBe(false);
   });

   it('should allow string with non-space characters',()=>{
       var res = isRealString('  Dorothy    ');
       expect(res).toBe(true);
   });
});