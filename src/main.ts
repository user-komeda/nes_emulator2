import load from './nes/load'

const element = document.getElementById('nes') as HTMLInputElement

element.addEventListener('change', () => {
  const file = element.files![0]
  const fileReader = new FileReader()
  fileReader.onload = () => {
    load(fileReader.result as ArrayBuffer)
  }
  fileReader.readAsArrayBuffer(file)
})
