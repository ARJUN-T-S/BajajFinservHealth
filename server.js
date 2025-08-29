const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();

const PORT=process.env.PORT||5000;

app.use(cors());
app.use(express.json());

function processData(inputData,userInfo){
    let evenNumbers=[],oddNumbers=[],alphabets=[],specialCharacters=[],sum=0,alphaChars=[];
    inputData.forEach(item=>{
        const strItem=String(item);
        if(!isNaN(strItem)&&strItem.trim()!==''){
            const num=Number(strItem);
            sum+=num;
            if(num%2===0)evenNumbers.push(strItem);
            else oddNumbers.push(strItem);
        }else if(strItem.match(/[a-zA-Z]/)){
            alphabets.push(strItem.toUpperCase());
            alphaChars.push(strItem);
        }else specialCharacters.push(strItem);
    });
    let concatString='';
    if(alphaChars.length>0){
        const reversed=alphaChars.join('').split('').reverse().join('');
        concatString=reversed.split('').map((char,index)=>index%2===0?char.toUpperCase():char.toLowerCase()).join('');
    }
    return{
        is_success:true,
        user_id:userInfo.user_id,
        email:userInfo.email,
        roll_number:userInfo.roll_number,
        odd_numbers:oddNumbers,
        even_numbers:evenNumbers,
        alphabets:alphabets,
        special_characters:specialCharacters,
        sum:String(sum),
        concat_string:concatString
    };
}

app.post('/bfhl',(req,res)=>{
    try{
        const data=req.body.data;
        if(!data||!Array.isArray(data)){
            return res.status(400).json({is_success:false,error:"Invalid input. 'data' must be an array."});
        }
        const userInfo={user_id:"ts_arjun_02082004",email:"tgsarjun083@gmail.com",roll_number:"22BCE0507"};
        const response=processData(data,userInfo);
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({is_success:false,error:"Internal server error"});
    }
});

app.get('/bfhl',(req,res)=>res.status(200).json({operation_code:1}));

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
