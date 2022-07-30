function formifyInit(fields, url, heading = 'Contact/Feedback') {
  const mainDiv = document.createElement('div');
  const formify = document.createElement('div');
  const formHeading = document.createElement('div');
  const formMain = document.createElement('div');
  const formNotice = document.createElement('div');
  const formLoader = document.createElement('div');
  const formToggler = document.createElement('div');
  const submitButton = document.createElement('button');

  let formShow = false;
  let formData = {};

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formInputCSS = `box-sizing:border-box;width:100%;padding:8px;margin-bottom: 14px; border: none;border-radius:4px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111; font-size: 15px; `;

  const formTextAreaCSS = `${formInputCSS}max-height:300px;max-width:100%;min-width:100%;min-height:100px; `;

  const formifyCSS = `background-color:#374151;padding:28px;border:2px solid #eee;border-radius:10px;font-family:'SegoeUI',Tahoma,Geneva,Verdana,sans-serif;margin-bottom:10px;width:0;/*transform:translateX(-400px);*/transform:translateX(400px);transition: transform 1s ease, width 1s ease;`;

  const formifyTranslateCSS = `${formifyCSS}position:relative;width:240px;transform:translateX(0);`;

  submitButton.textContent = 'Send';
  submitButton.style.cssText = `width:100%;padding:6px 8px;border:none;border-radius:4px;font-size:17px;background-color:#3b82f6;color:#eee;cursor:pointer;`;

  const formNoticeCSS = `text-align:center;font-size:15px;padding-bottom:10px;display:none; `;

  const formNoticeWarningCSS = `${formNoticeCSS}color:rgb(232,232,64);display:block;`;
  const formNoticeSuccessCSS = `${formNoticeCSS}color:#22d3ee;display:block;`;

  formNotice.style.cssText = formNoticeCSS;

  formLoader.innerHTML = ` <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 10 50 80" enable-background="new 0 0 0 0" xml:space="preserve" width="80" height="80"> <circle fill="#0ea5e9" stroke="none" cx="6" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" /> </circle> <circle fill="#0ea5e9" stroke="none" cx="26" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" /> </circle> <circle fill="#0ea5e9" stroke="none" cx="46" cy="50" r="6"> <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" /> </circle> </svg>
  `;

  const formLoaderCSS = `position:absolute;background-color:rgba(255,255,255,0.01);inset:0;width:100%;height:100%;place-content:center;display:none;`;

  const formLoaderEnableCSS = `${formLoaderCSS}display:grid;`;

  formLoader.style.cssText = formLoaderCSS;

  formToggler.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-50' style="color: #eee;" fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} width="28" height="28"> <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /> </svg>`;

  formToggler.style.cssText = `width:32px;height:32px;border-radius:100%;background-color:#374151;text-align:center;padding:5px;display:grid;place-content:center;cursor:pointer;`;

  function notify(type = 'warning', message = 'Please fill all the fields') {
    formNotice.textContent = message;
    formNotice.style.cssText =
      type === 'warning' ? formNoticeWarningCSS : formNoticeSuccessCSS;
    setTimeout(() => {
      formNotice.textContent = '';
      formNotice.style.cssText = formNoticeCSS;
    }, 2500);
  }

  formify.appendChild(formHeading);

  function createFormElements(formFields) {
    formFields.forEach((f) => {
      formData[f] = '';
    });
    // formData['message'] = '';
    for (let field of formFields) {
      if (field === 'message') {
        const formDiv = document.createElement('div');
        const formTextarea = document.createElement('textarea');
        formTextarea.className = 'formify-input';
        formTextarea.name = 'message';
        formTextarea.placeholder = 'Message';
        formTextarea.rows = 4;
        formTextarea.style.cssText = formTextAreaCSS;
        formTextarea.addEventListener('focus', function (e) {
          this.style.outline = '2px solid #eee';
        });
        formTextarea.addEventListener('focusout', function (e) {
          this.style.outline = 'none';
        });
        formTextarea.addEventListener('change', function (e) {
          const key = e.target.name;
          const value = e.target.value;
          formData[key] = value;
        });
        formDiv.appendChild(formTextarea);
        formMain.appendChild(formDiv);
      } else {
        const formDiv = document.createElement('div');
        const formInput = document.createElement('input');
        formInput.className = 'formify-input';
        formInput.name = field;
        formInput.type = field === 'email' ? 'email' : 'text';
        formInput.placeholder = capitalize(field);
        formInput.style.cssText = formInputCSS;
        formInput.addEventListener('focus', function () {
          this.style.outline = '2px solid #eee';
        });
        formInput.addEventListener('focusout', function () {
          this.style.outline = 'none';
        });
        formInput.addEventListener('change', (e) => {
          const key = e.target.name;
          const value = e.target.value;
          formData[key] = value;
        });
        formDiv.appendChild(formInput);
        formMain.appendChild(formDiv);
      }
    }

    formMain.appendChild(formNotice);
    const submitDiv = document.createElement('div');

    submitButton.addEventListener('click', async (e) => {
      // console.log('data', formData);
      const dataArr = Object.entries(formData).map((a) => a[1]);

      const isEmpty = dataArr.some((d) => d === '');

      if (isEmpty || dataArr.length < 1) {
        return notify();
      }
      console.log('Ready to submit');

      try {
        formLoader.style.cssText = formLoaderEnableCSS;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (result) {
          formLoader.style.cssText = formLoaderCSS;
          notify('success', 'Successfully submitted');
          const formifyInputs = document.querySelectorAll('.formify-input');
          formifyInputs.forEach((i) => {
            i.value = '';
          });
          for (let key in formData) {
            formData[key] = '';
          }
        }
      } catch (err) {
        formLoader.style.cssText = formLoaderCSS;
        notify('warning', 'Failed to send');
      }
    });
    submitDiv.appendChild(submitButton);
    formMain.appendChild(submitDiv);

    formify.appendChild(formMain);
  }

  formHeading.textContent = heading;
  formify.appendChild(formHeading);
  createFormElements(fields);
  formify.appendChild(formLoader);
  mainDiv.appendChild(formify);
  mainDiv.appendChild(formToggler);

  formToggler.addEventListener('click', (e) => {
    if (!formShow) {
      formShow = true;
      // console.log('Inside false');
      formify.style.cssText = formifyTranslateCSS;
    } else {
      formShow = false;
      // console.log('Inside true');
      formify.style.cssText = formifyCSS;
    }
  });

  mainDiv.style.cssText = `position:fixed;bottom:20px;right:20px;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-end;z-index:9999;`;

  formMain.style.cssText = `display:flex;flex-direction:column;`;

  formHeading.style.cssText = `font-size:24px;color:#f9fafb;margin-bottom:10px;`;

  formify.style.cssText = formifyCSS;

  document.body.appendChild(mainDiv);
}
