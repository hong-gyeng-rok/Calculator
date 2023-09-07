const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector('.calculator__buttons');
const operator = document.querySelector('.calculator__operator');
const display = document.querySelector('.calculator__display--for-advanced');

let firstNum = '';
let operatorForAdvanced = '';
let previousKey = '';
let previousNum = '';

function calculate(n1, operator, n2){
   let result = 0;
   if(operator === "+"){
      result = Number(n1) + Number(n2);
   }else if(operator === "-"){
      result = Number(n1) - Number(n2);
   }else if(operator === "*"){
      result = Number(n1) * Number(n2);
   }else if(operator === "/"){
      result = Number(n1) / Number(n2);
   }else{
      alert("Errer");
   }
   return String(result);
}

buttons.addEventListener('click', function (event) {
   const target = event.target;
   const action = target.classList[0]; // target의 클래스를 가져옴
   const buttonContent = target.textContent // 타겟의 텍스트 벨류 가지고 옴

   if(target.matches("button")){
      if(action === "number"){
         if(display.textContent === '0' && operatorForAdvanced === ""){
            display.textContent = buttonContent;
            firstNum = display.textContent;
            //첫 숫자를 입력할 때

         }else if(display.textContent !== '0' && operatorForAdvanced === ""){
            display.textContent = display.textContent + buttonContent;
            firstNum = display.textContent;
            // 두번째 이후 숫자를 입력할 떄 + 연산자를 입력할 때

         }else if(display.textContent !== '0' && operatorForAdvanced !== ""){
            if(previousKey === operatorForAdvanced){
               display.textContent = buttonContent;
               previousKey = display.textContent;
               previousNum = display.textContent;
               //연산자 이후 계산할 숫자를 입력할 때
            } else if(previousKey !== operatorForAdvanced){
               display.textContent = display.textContent + buttonContent;
               previousNum = display.textContent;
            }
         }
      }
      if(action === 'operator'){
         operatorForAdvanced = buttonContent;
         previousKey = operatorForAdvanced;
      }

      if(action === 'clear'){
         display.textContent = 0;
         firstNum = '';
         operatorForAdvanced = '';
         previousKey = '';
         previousNum = '';
      }

      if (action === 'calculate') { // Enter(계산) 버튼을 누를 때
         if(firstNum !== '' && operatorForAdvanced === '') {
           display.textContent = firstNum;
         }
         else if(firstNum !== '' && previousNum === '') {
           display.textContent = calculate(display.textContent, operatorForAdvanced, display.textContent)
         } // 기존에 작성했던 calculate 함수를 이용하여 계산 상황에 따른 전달인자와 함께 호출
         else if(previousKey === display.textContent){
           display.textContent = calculate(firstNum, operatorForAdvanced, previousNum)       
          } 
          else if(previousKey !== display.textContent && previousNum !== '') {
           display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum)
          }   
          else if(previousKey !== display.textContent && previousNum === '') {
           display.textContent = firstNum;
          }
        }
   }
})
