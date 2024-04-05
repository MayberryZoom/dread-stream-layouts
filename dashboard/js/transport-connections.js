const transportConnections = nodecg.Replicant('transportConnections', {
    defaultValue: {
        artariaToBurenia: null,
        artariaToCataris: null,
        artariaToDairon: null,
        bureniaToArtaria: null,
        bureniaToDaironLower: null,
        bureniaToDaironUpper: null,
        bureniaToGhavoran: null,
        catarisToArtaria: null,
        catarisToDairon: null,
        daironToArtaria: null,
        daironToBureniaLower: null,
        daironToBureniaUpper: null,
        daironToCataris: null,
        daironToFereniaEast: null,
        daironToFereniaWest: null,
        daironToGhavoran: null,
        elunToGhavoran: null,
        fereniaToDaironEast: null,
        fereniaToDaironWest: null,
        fereniaToGhavoran: null,
        fereniaToHanubia: null,
        ghavoranToBurenia: null,
        ghavoranToDairon: null,
        ghavoranToElun: null,
        ghavoranToFerenia: null,
        ghavoranToHanubia: null,
        hanubiaToFerenia: null,
        hanubiaToGhavoran: null,
        hanubiaToItorash: null,
        itorashToHanubia: null,
    }
});

window.addEventListener('load', () => {
    NodeCG.waitForReplicants(transportConnections).then(() => {
        const transportNames = Object.keys(transportConnections.value);

        const toHumanReadable = (text) => {
            text = text.replace(/([A-Z])/g, ' $1')
            return text.charAt(0).toUpperCase() + text.slice(1);
        }

        const toId = (text) => {
            text = text.replace(/ /g, '');
            return text.charAt(0).toLowerCase() + text.slice(1);
        }

        const createElementWithClass = (element, ...classes) => {
            let toReturn = document.createElement(element);

            classes.forEach(x => toReturn.classList.add(x));

            return toReturn;
        }

        let transportsList = document.getElementById('transports-container');

        let transportRow = createElementWithClass('div', 'transport-row');
        let innerDivLeft = createElementWithClass('div', 'transport-container', 'left');
        let innerSpanLeft = createElementWithClass('span', 'transport-text', 'right');
        let innerDivRight = createElementWithClass('div', 'transport-container', 'right');

        innerDivLeft.appendChild(innerSpanLeft);
        transportRow.append(innerDivLeft, innerDivRight);

        let dropdownButton = createElementWithClass('div', 'dropdown', 'button');
        dropdownButton.textContent = 'Select connection'
        let dropdownContent = createElementWithClass('div', 'dropdown-content');

        transportNames.forEach(x => {
            let link = createElementWithClass('a', 'dropdown-link', x);
            link.href = '#';
            link.textContent = toHumanReadable(x);

            dropdownContent.appendChild(link);
        });

        transportNames.forEach(x => {

            currentRow = transportRow.cloneNode(true);
            currentRow.classList.add(x);

            currentRow.firstChild.textContent = toHumanReadable(x);

            currentButton = dropdownButton.cloneNode(true);
            currentButton.classList.add(x)

            currentRow.firstChild.nextSibling.append(currentButton, dropdownContent.cloneNode(true));
            transportsList.appendChild(currentRow);
        });

        transportConnections.on('change', newValue => {
            Object.keys(newValue).forEach(x => {
                document.querySelector('.dropdown.button.' + x).textContent = transportConnections.value[x] ? toHumanReadable(transportConnections.value[x]) : 'Select connection';
            });
        });

        document.addEventListener('click', event => {
            document.querySelectorAll('.dropdown-content').forEach(element => { if (element.previousSibling !== event.target) element.classList.remove('shown') });

            if (event.target.matches('.dropdown.button')) {
                let targetDropdownContent = event.target.nextSibling;

                targetDropdownContent.classList.toggle('shown');

                if (targetDropdownContent.getBoundingClientRect().bottom > window.innerHeight) targetDropdownContent.classList.add('snap-to-bottom');
            }
            else if (event.target.matches('.dropdown-link')) {
                targetId = toId(event.target.textContent);
                parentId = toId(event.target.parentElement.parentElement.previousSibling.textContent);

                if (parentId === targetId) return;

                if (transportConnections.value[parentId]) transportConnections.value[transportConnections.value[parentId]] = null;
                if (transportConnections.value[targetId]) transportConnections.value[transportConnections.value[targetId]] = null;

                transportConnections.value[parentId] = targetId;
                transportConnections.value[targetId] = parentId;
            }
            else if (event.target.matches('.clear.button')) {
                Object.keys(transportConnections.value).forEach(x => transportConnections.value[x] = null);
            }
        });
    });
});
