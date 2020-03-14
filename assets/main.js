import apiData from '../spider/mpapi.json';
import componentData from '../spider/mpcomponent.json';
const API_DOAMIN = 'https://developers.weixin.qq.com/miniprogram/dev/api/';
const COMPONENT_DOAMIN = 'https://developers.weixin.qq.com/miniprogram/dev/component/';
const apiBtn = document.querySelector('.api-btn');
const comBtn = document.querySelector('.component-btn');
const apiTableEle = document.querySelector('.api-table');
const comTableEle = document.querySelector('.component-table');
const apiBodyEle = document.querySelector('.api-table-body');
const comBodyEle = document.querySelector('.component-table-body');

const versionSort = (a, b) => {
  const [numa = '1.0.0'] =  a.version;
  const [numb = '1.0.0'] =  b.version;
  const numas = numa.split('.');
  const numbs = numb.split('.');
  if (numas[0] !== numbs[0]) {
    return Number(numbs[0]) - Number(numas[0]);
  }
  if (numas[1] !== numbs[1]) {
    return Number(numbs[1]) - Number(numas[1]);
  }
  return Number(numbs[2]) - Number(numas[2]);
}

const sortedApiData = apiData.sort(versionSort);
const sortedComponentData = componentData.sort(versionSort);

const appendItemToTable = (item, bodyEle) => {
  const tr = document.createElement("tr");
  const [ ver = ''] = item.version;
  item.desc = item.desc.replace(`href="`, `rel="noopener noreferrer" target="_blank" href="${COMPONENT_DOAMIN}`);
  tr.innerHTML = `
  <td><a rel="noopener noreferrer" target="_blank" href="${item.link}">${item.api}</a></td>
  <td>${item.desc}</td>
  <td>${ver}</td>
  </tr>`;
  bodyEle.appendChild(tr);
};


sortedApiData.forEach(item => {
  if (item.api) {
    appendItemToTable(item, apiBodyEle);
  }
});

sortedComponentData.forEach(item => {
  if (item.api) {
    appendItemToTable(item, comBodyEle);
  }
});

apiBtn.addEventListener('click', () => {
  if (!apiTableEle.classList.contains('active')) {
    apiTableEle.classList.add('active');
    apiBtn.classList.add('active');
    comTableEle.classList.remove('active');
    comBtn.classList.remove('active');
  }
});

comBtn.addEventListener('click', () => {
  if (!comTableEle.classList.contains('active')) {
    comTableEle.classList.add('active');
    comBtn.classList.add('active');
    apiTableEle.classList.remove('active');
    apiBtn.classList.remove('active');
  }
});
