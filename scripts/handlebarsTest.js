const Handlebars = require("handlebars");

// const templateSource = `
//   <h1>{{title}}</h1>
//   <p>{{description}}</p>
// `;
// const template = Handlebars.compile(templateSource);
// const html = template({
//   title: "Handlebars 示例",
//   description: "这是通过数据渲染出来的内容",
//   users: [
//     { name: "张三", age: 18 },
//     { name: "李四", age: 20 }
//   ]
  
// });
// console.log(html);

Handlebars.registerHelper("formatPrice", function (price) {
  return `¥${price.toFixed(2)}`;
});
const source = `
  <h2>{{product.name}}</h2>
  {{#if product.inStock}}
    <p>库存充足</p>
  {{else}}
    <p>暂时缺货</p>
  {{/if}}
  <p>价格：{{formatPrice product.price}}</p>
  <ul>
    {{#each product.tags}}
      <li>{{this}}</li>
    {{/each}}
  </ul>
`;
const template = Handlebars.compile(source);
const html = template({
  product: {
    name: "机械键盘",
    price: 299,
    inStock: true,
    tags: ["外设", "键盘", "热插拔"]
  }
});
console.log(html)
// document.body.innerHTML = html;