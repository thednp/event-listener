export const getExampleDOM = () => {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const HTML = document.documentElement;
  HTML.innerHTML = 
`<head>
  <meta charset="UTF-8">
  <title>EventListener Testing Page</title>
</head>
<body style="height: 1000px">
  <b>No test has changed this yet.</b>
</body>
`;

  return HTML;
};
