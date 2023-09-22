const element = document.getElementById('nes') as HTMLInputElement

element.addEventListener('change', () => {
  const file = element.files![0]
  const fileReader = new FileReader()
  fileReader.onload = () => {
    console.log(fileReader.result)
  }
  fileReader.readAsArrayBuffer(file)
})
