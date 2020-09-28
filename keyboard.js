window.addEventListener('load', addEvents)

const [topRow, row2, row3, row4] = [document.getElementById('top-row'), document.getElementById('row2'), document.getElementById('row3'), document.getElementById('row4'), ]
const textInfo = typewriter()
const cussWords = ['erotic', 'eroticism', 'escort', 'faggot', 'feltch', 'hooker', 'hardcore', 'intercourse', 'sex', 'fuck']

function Key(normal, shift){
    this.normal = normal
    this.shift = shift
}

function addEvents(){
    createKeys()
    createButtons()
    addEventToSpaceBar()
}

function typewriter(){
    let [text, caps, shift, passwd, clean, rev] = ['', false, false, false, false, false]

    // toggle functions
    function toggleCaps(){
        caps = !caps
    }

    function toggleShift(){
        shift = !shift
    }

    function togglePasswd(){
        passwd = !passwd
    }

    function toggleClean(){
        clean = !clean
    }

    function toggleReverse(){
        rev = !rev
    }


    // get status of values
    function getShiftStatus(){
        return shift
    }

    function getCapsStatus(){
        return caps
    }

    function getPasswdStatus(){
        return passwd
    }

    function getCleanStatus(){
        return clean
    }

    function getReverseStatus(){
        return rev
    }


    // manipulate text functions
    function deletePrevious(){
        text = text.slice(0, text.length-1)
        return returnText()
    }

    function addChar(keyObj){
        let key = keyObj.getAttribute('data-shift')
        if(key === 'DEL') {
            return deletePrevious()
        }
        if(key === 'SPACE') {
            text += ' '
            return returnText()
        }

        if(caps && keyObj.parentElement.id !== 'top-row'){
            key = keyObj.getAttribute('data-shift')
            if(key === '.COM'){
                text += key
                return returnText()
            }
        }
        else if(shift && keyObj.parentElement.id === 'top-row'){
            key = keyObj.getAttribute('data-shift')
        }
        else{
            key = keyObj.getAttribute('data-normal')
            if(key === '.com'){
                text += key
                return returnText()
            }
        }
        text += key
        return returnText()
    }

    function passwdLock(textStr){
        let len = textStr.length
        if(len < 2){
            return textStr
        }
        return Array(len-1).fill('*').join('') + textStr[len-1]
    }
    
    function reverse(textStr){
        return textStr.split('').reverse().join('')
    }

    function cleanText(textStr){
        textStr = textStr.split(' ')
        textStr = textStr.map(function(word){
            if(cussWords.indexOf(word.toLowerCase()) !== -1){
                return word[0] + Array(word.length-2).fill('*').join('') + word[word.length-1]
            }
            return word
        })
        return textStr.join(' ')
    }

    function returnText(){
        let textStr = text
        if(clean){
            textStr = cleanText(textStr)
        }
        if(passwd){
            textStr = passwdLock(textStr)
        }
        if(rev){
            textStr = reverse(textStr)
        }
        // console.log(textStr.join(''))
        return textStr
    }    

    // get the updated text value
    function getText(){
        return text
    }

    return {toggleCaps, toggleShift, togglePasswd, toggleClean, toggleReverse, 
            getShiftStatus, getCapsStatus, getPasswdStatus, getReverseStatus, getCleanStatus,
            deletePrevious, addChar, returnText, getText}
}

function createKeys(){
    const [alphabets1, alphabets2, alphabets3, digits, specials] = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM', '1234567890', '!@#$%^&*()']
    const extra = ['DEL', '.com']

    for(let i=0; i<4; i++){
        for(let j=0; j<11-i; j++){
            if(i === 0){
                if(j === 11-i-1){
                    extraKey(extra[0], 'center', topRow)
                    continue
                }
                topKey(digits[j], specials[j], topRow)
            }
            else if(i === 1){
                normalKey(alphabets1[j], row2)
            }
            else if(i === 2){
                normalKey(alphabets2[j], row3)
            }
            else if(i === 3){
                if(j === 11-i-1){
                    extraKey(extra[1], 'end', row4)
                    continue
                }
                normalKey(alphabets3[j], row4)
            }
        }
    }
}


function normalKey(...charData){
    const [letter, rowObj] = charData
    let div = document.createElement('div')
    let h3 = document.createElement('h3')

    div.classList.add('dark-bg', 'm-0', 'key', 'mx-2', 'p-1')
    h3.classList.add('alphabet-main', 'm-0', 'p-0')
    h3.textContent = letter

    div.append(h3)
    div.setAttribute('data-normal', letter.toLowerCase())
    div.setAttribute('data-shift', letter)
    addClickEvents(div)
    rowObj.append(div)
}

function topKey(...charData){
    const [digit, special, rowObj] = charData
    let div = document.createElement('div')
    let h5 = document.createElement('h5')
    let h6 = document.createElement('h6')

    div.classList.add('dark-bg', 'm-0', 'key', 'mx-2', 'p-1')
    h5.classList.add('number', 'm-0', 'p-0')
    h5.textContent = digit
    h6.classList.add('special-char', 'm-0', 'p-0')
    h6.textContent = special

    div.append(h5, h6)
    div.setAttribute('data-normal', digit)
    div.setAttribute('data-shift', special)
    addClickEvents(div)
    rowObj.append(div)
}

function extraKey(...charData){
    const [char, alignVert, rowObj] = charData
    let div = document.createElement('div')
    let h6 = document.createElement('h6')

    div.classList.add('dark-bg', 'm-0', 'key', 'mx-2', 'd-flex', 'p-1', 'justify-content-center')
    h6.classList.add('m-0', 'p-0', 'text-center', 'align-self-'+alignVert)
    h6.textContent = char

    div.append(h6)
    div.setAttribute('data-normal', char)
    div.setAttribute('data-shift', char === '.com' ? char.toUpperCase() : char)
    addClickEvents(div)
    rowObj.append(div)
}

function addClickEvents(keyObj){
    keyObj.addEventListener('click', function(){
        addTextToScreen(textInfo.addChar(keyObj))
    })
}

function addEventToSpaceBar(){
    let obj = document.getElementById('sp-bar-obj')
    obj.addEventListener('click', function(){
        addTextToScreen(textInfo.addChar(obj))
    })
}

function addTextToScreen(textStr){
    let screenText = document.getElementById('screen-text')
    screenText.value = textStr
}

function createButtons(){
    let outerDiv = document.getElementById('btn-grp')
    const btns = ['CAPS', 'SHIFT', 'PASSWD', 'CLEAN', 'REV']

    for(let i=0; i<btns.length; i++){
        let div = document.createElement('div')
        div.classList.add('btn', 'btn-outline-dark', 'rounded-0', 'm-2')
        div.textContent = btns[i]
        div.addEventListener('click', () => {
            if(i === 0){
                textInfo.toggleCaps()
                toggleTextColor(div, textInfo.getCapsStatus())
            }
            else if(i === 1){
                textInfo.toggleShift()
                toggleTextColor(div, textInfo.getShiftStatus())
            }
            else if(i === 2){
                textInfo.togglePasswd()
                toggleTextColor(div, textInfo.getPasswdStatus())
                addTextToScreen(textInfo.returnText())
            }
            else if(i === 3){
                textInfo.toggleClean()
                toggleTextColor(div, textInfo.getCleanStatus())
                addTextToScreen(textInfo.returnText())
            }
            else if(i === 4){
                textInfo.toggleReverse()
                toggleTextColor(div, textInfo.getReverseStatus())
                addTextToScreen(textInfo.returnText())
            }
        })
        outerDiv.append(div)
    }
}

function toggleTextColor(btnObj, status){
    if(status){
        btnObj.classList.add('text-success')
    }
    else{
        btnObj.classList.remove('text-success')
    }
}