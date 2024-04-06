// Resize runner names
for (const element of document.getElementsByClassName('runner-name')) {
    let fontSize = parseInt(getComputedStyle(element).getPropertyValue('font-size'));
    const containerWidth = element.parentElement.parentElement.offsetWidth;

    while (element.parentElement.offsetWidth + element.parentElement.offsetHeight + 10 > containerWidth) element.style.fontSize = --fontSize + 'px';
}

// Move runner times below runner names
for (const element of document.getElementsByClassName('runner-time')) {
    element.style.right = element.parentElement.offsetWidth - element.offsetWidth - 10 + "px";
    element.style.top = element.parentElement.offsetHeight + "px";
}

// Resize commentator names
for (const element of document.getElementsByClassName('commentator')) {
    let fontSize = parseInt(getComputedStyle(element).getPropertyValue('font-size'));
    const parentStyles = getComputedStyle(element.parentElement);

    const containerWidth = element.parentElement.clientWidth
        - parseInt(parentStyles.getPropertyValue('padding-left'))
        - parseInt(parentStyles.getPropertyValue('padding-right'));

    while (element.offsetWidth > containerWidth) element.style.fontSize = --fontSize + 'px';
}

// Resize category name
for (const element of document.querySelectorAll('#category')) {
    let fontSize = parseInt(getComputedStyle(element).getPropertyValue('font-size'));
    const parentStyles = getComputedStyle(element.parentElement);

    const containerWidth = element.parentElement.clientWidth
        - parseInt(parentStyles.getPropertyValue('padding-left'))
        - parseInt(parentStyles.getPropertyValue('padding-right'));

    while (element.offsetWidth > containerWidth) element.style.fontSize = --fontSize + 'px';
}
