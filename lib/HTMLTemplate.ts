import { FieldsObjType } from '../types';
import { fieldsToArray, capitalize } from '../utils';

const template = (
  data: FieldsObjType,
  fieldNames: string,
  formHeading: string
) => {
  const fields = fieldsToArray(fieldNames) as Array<keyof FieldsObjType>;

  let fieldsString = '';

  for (let field of fields) {
    fieldsString += `
<div class="fe-item" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
  <p class="fe-label" style="font-size: 14px;">
    ${capitalize(field)}
  </p>
  <p class="fe-content" style="font-size: 16px">
    ${data[field]}
  </p>
</div>
`;
  }

  const now = new Date();
  const date =
    now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) +
    ' ' +
    now.toLocaleTimeString('en-US');

  return `<!DOCTYPE html>
<html>

  <head>
    <base target="_top">
    <style>
      .fe-container {
        display: flex;
        justify-content: center;
        margin: auto;
        max-width: 500px;
        padding: 0 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      }

      .fe-heading {
        color: #4c4c4c;
        font-size: 1.7rem;
      }

      .fe-item {
        margin: 16px auto;
        margin-bottom: 20px;
      }

      .fe-label {
        color: #808080;
        font-size: 0.8rem;
        font-weight: 500;
        margin: 0;
        margin-bottom: 5px;
      }

      .fe-content {
        margin: 0;
      }

      .fe-date {
        color: #737373;
        padding-top: 15px;
      }

      .fe-bottom {
        background-image: linear-gradient(145deg,
            #f60000,
            #cd00cd,
            #ff8c00,
            #ffee00,
            #4de94c,
            #f60000,
            #cd00cd,
            #ff8c00,
            #ffee00,
            #4de94c,
            #f60000,
            #cd00cd);
        width: 100%;
        padding-top: 4px;
        position: relative;
      }

      .fe-bottom a {
        text-decoration: none;
      }

      .fe-bg {
        position: absolute;
        width: 100%;
        padding-top: 5px;
        background-color: white;
      }
    </style>
  </head>

  <body>
    <div class="fe-container">
      <div>
        <h1 class="fe-heading" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-top:0;">
          ${formHeading}
        </h1>

        ${fieldsString}

        <div class="fe-item" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          <p class="fe-date" style="font-size:14px">
            Submitted date: ${date}
          </p>
        </div>

        <div class="fe-bottom">
          <div class="fe-bg" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
            <p style="margin: 0">
              Created using: <a href="https://formify.vercel.app/">Formify</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </body>

</html>

`;
};

export default template;
