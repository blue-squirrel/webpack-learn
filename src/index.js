import './index.less';

class Test {
    constructor() {
      this.renderImg()
    }
  
    renderImg() {
      const img = document.createElement('img')
      img.src = '../public/lol.png'
      document.body.appendChild(img)
      console.log('谁敢横刀立马，唯我虎大捞比');
    }
  }
  
  new Test()
