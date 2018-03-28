var componentName = 'dropdown-input';

var xhr = new XMLHttpRequest();
xhr.open('GET', './dropdown-input.html');
xhr.addEventListener('load', function(data) {
    if (!xhr.status === 200) {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
    else {
        runCode(xhr.responseText.trim())
    }
});
xhr.send();

function runCode(template) {

        class NewComponent extends HTMLElement {

            constructor() {
                super();
                let shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.innerHTML = template; // go get template here
            } 

            get setOptions(){
                let options = JSON.parse(this.getAttribute('options'));
                let ul = this.shadowRoot.querySelector('#dropdown-items');
                options.forEach(op => {
                    let li = document.createElement('li');
                    li.textContent = op;
                    ul.appendChild(li);
                });
            }

            connectedCallback() {

                this.setOptions;
                runCode(this.shadowRoot);

                function runCode(shadowRoot){
                    console.log(shadowRoot);

                    let dropdown        = shadowRoot.querySelector('#dropdown');
                    let dropdownUl      = shadowRoot.querySelector('#dropdown-items');
                    $(dropdownUl).hide();
                    let dropdownLi      = shadowRoot.querySelectorAll('#dropdown-items li');
                    let dropdownContent = shadowRoot.querySelector('#dropdown span');
                    console.log(dropdown, dropdownLi, dropdownContent, dropdownUl)
                
                    dropdown.addEventListener('focusin', event => {
                        openAndCloseDropdown(event);
                    });
                
                
                    dropdown.addEventListener('focusout', e => {
                        setTimeout(() => openAndCloseDropdown(e), 200);
                    });
                
                
                    dropdown.addEventListener('keyup', e => {
                        // remove selected from all elements
                        dropdownLi.forEach(li => {
                            li.classList.remove('selected');
                        });
                        // if they press enter, get the first item in the list for now
                        if(e.keyCode == 13){
                            // e.preventDefault();
                            // switchDropdownTextValue(dropdownLi[0]);
                            // shadowRoot.querySelector('span[contenteditable=true]').blur();
                            // dropdownUl.innerHTML = '';
                            // Array.from(dropdownLi).sort(sort_li).forEach(li => {
                            //     dropdownUl.appendChild(li) ;
                            // });
                        }
                        else if(e.keyCode == 38) {//up
                        // add ability for user to press up to go to the next item
                        }
                        else if(e.keyCode == 40) {//down
                        // add ability for user to press down to go to the next item
                        }
                        else {
                            dropdownLi.forEach(li => {
                                let inputText = e.target.textContent.toLowerCase();
                                let dropdownItemText = li.textContent.toLowerCase();
                
                                if(!dropdownItemText.includes(inputText)){
                                    $(li).hide()
                                } 
                                else {
                                    $(li).show();
                                }
                            });
                        }
                    });
                
                
                    dropdownLi.forEach(li => {
                        li.addEventListener('click', e => {
                        dropdownLi.forEach(listItem => {
                            listItem.classList.remove('selected');
                        });
                        switchDropdownTextValue(e.target);
                        });
                    });
                
                
                    //////////////////////////////////////////////////////
                    ////////// Supporting functions
                    /**
                     *
                     */
                    function sort_li(a, b) {
                        return (b.textContent) < (a.textContent) ? 1 : -1;
                    }
                
                
                    /**
                     *
                     */
                    function switchDropdownTextValue(chosenElement){
                        let originalText = dropdown.textContent;
                        dropdownContent.textContent = chosenElement.textContent;
                        console.log(originalText, dropdownContent.textContent)
                        //highlight the one we chose
                        chosenElement.classList.add('selected');
                        shadowRoot.querySelector('#dropdown-value').setAttribute('value', chosenElement.textContent);
                    }
                
                
                    /**
                     *
                     */
                    function openAndCloseDropdown(event){
                        dropdownUl.innerHTML = ''
                        Array.from(dropdownLi).sort(sort_li).forEach(li => {
                            dropdownUl.appendChild(li) ;
                        });
                        if(dropdown.classList.contains('selected')){
                            dropdown.classList.remove('selected');
                        }
                        else {
                            dropdown.classList.add('selected');
                        }
                        $(dropdownUl).slideToggle(280, function(){
                            // if(event.type == 'focusout'){  dropdownLi.style.diplay = 'block' }
                        });
                    }
                }
            }
        } //end html element

        //add new element to window
        window.customElements.define(componentName, NewComponent);
}



