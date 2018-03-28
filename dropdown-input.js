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
                let options = this.getAttribute('options').split(',').map(op => op.trim());
                let ul = this.shadowRoot.querySelector('#dropdown-items');
                options.forEach(op => {
                    let li = document.createElement('li');
                    li.textContent = op;
                    ul.appendChild(li);
                });
            }

            connectedCallback() {
                let parent = this;

                parent.setOptions;
                    let dropdown        = parent.shadowRoot.querySelector('#dropdown');
                    let dropdownUl      = parent.shadowRoot.querySelector('#dropdown-items');
                    $(dropdownUl).hide();
                    let dropdownLi      = parent.shadowRoot.querySelectorAll('#dropdown-items li');
                    let dropdownContent = parent.shadowRoot.querySelector('#dropdown span');
                
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
                            // parent.shadowRoot.querySelector('span[contenteditable=true]').blur();
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
                        //highlight the one we chose
                        chosenElement.classList.add('selected');

                        let $component = $('input[name*="'+componentName+'"]');
                        console.log($component.length)
                        if($component.length == 0){
                            console.log(parent);
                            $(parent).before('<input type="hidden" name="'+componentName+'1" value="'+chosenElement.textContent+'" id="dropdown-value">');
                        }
                        else {
                            $component = $.map($component, input => parseInt(input.getAttribute('name').match(/\d+/)));
                            console.log($component);
                            $(parent).before('<input type="hidden" name="'+componentName+(Math.max(...$component)+1)+'" value="'+chosenElement.textContent+'" id="dropdown-value">');
                        }
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
        } //end html element

        //add new element to window
        window.customElements.define(componentName, NewComponent);
}



