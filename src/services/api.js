import http from '@/services/http';
// import router from '@/router';
// import i18n from '@/locales/index';
// import alertService from './alertService';
// import userService from './userService';
// import commonService from './commonService';
import { useGlobalLoadingStore } from '@/stores/globalLoading'
import {
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_SERVER,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_VALIDATE,
  ERROR_CODE_UNAUTHORIZED
} from '@/configs/http_error_code'

export default {
  async get (url, params = {}) {
    try {
      const result = await http.get(url, params);
      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  },
  async getWithLoading (url, params = {}) {
    const loadingStore = useGlobalLoadingStore()
    try {
      loadingStore.displayLoading()
      const result = await http.get(url, params);
      loadingStore.hideLoading()

      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      loadingStore.hideLoading()
      return this.handleError(error);
    }
  },
  async post (url, params = {}) {
    const loadingStore = useGlobalLoadingStore()
    try {
      loadingStore.displayLoading()
      const result = await http.post(url, params);
      loadingStore.hideLoading()

      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      loadingStore.hideLoading()
      return this.handleError(error);
    }
  },
  async postWithoutLoading (url, params = {}) {
    try {
      const result = await http.post(url, params);
      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  },
  async put (url, params = {}) {
    const loadingStore = useGlobalLoadingStore()
    try {
      loadingStore.displayLoading()
      const result = await http.put(url, params);
      loadingStore.hideLoading()

      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      loadingStore.hideLoading()
      return this.handleError(error);
    }
  },
  async patch (url, params = {}) {
    try {
      const result = await http.patch(url, params);
      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  },
  async delete (url, params = {}) {
    const loadingStore = useGlobalLoadingStore()
    try {
      loadingStore.displayLoading()
      const result = await http.delete(url, params);
      loadingStore.hideLoading()
      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      loadingStore.hideLoading()
      console.log('catch', error);
      return this.handleError(error);
    }
  },
  async download (url, params = {}) {
    try {
      const result = await http.get(url, params, { responseType: 'blob' });
      const { status, data, headers } = result;

      let filename = '';
      const disposition = headers['content-disposition'];
      if (disposition.indexOf('filename*=') !== -1) {
        filename = decodeURIComponent(disposition.split('filename*=')[1].replace('utf-8\'\'', ''));
      } else {
        filename = disposition.split(';')[1].split('filename=')[1].split('"')[1];
      }

      return {
        status: true,
        code: status,
        data,
        headers,
        filename,
      };
    } catch (error) {
      return this.handleError(error);
    }
  },
  async downloadPost (url, params = {}) {
    const loadingStore = useGlobalLoadingStore()
    try {
      loadingStore.displayLoading()
      const result = await http.post(url, params, { responseType: 'blob' });
      loadingStore.hideLoading()

      const { status, data, headers } = result;
      return {
        status: true,
        code: status,
        data,
        headers,
      };
    } catch (error) {
      loadingStore.hideLoading()
      return this.handleError(error);
    }
  },
  async formUpload (url, params = {}) {
    const loadingStore = useGlobalLoadingStore()
    try {
      loadingStore.displayLoading()
      const result = await http.post(url, params, {
        'Content-Type': 'multipart/form-data',
      });
      loadingStore.hideLoading()
      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      loadingStore.hideLoading()
      return this.handleError(error);
    }
  },
  async formUploadWithoutLoading (url, params = {}) {
    try {
      const result = await http.post(url, params, {
        'Content-Type': 'multipart/form-data',
      });
      const { status, data } = result;
      return {
        status: true,
        code: status,
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  },
  handleError (error) {
    const { response, request } = error;
    const { status, data } = response;
    const errorCode = status || ERROR_CODE_SERVER;

    if (response) {
      this.handleResponseError(response);
    } else if (request) {
      this.handleNoResponse(request);
    } else {
      console.log('Error', error.message);
    }

    return {
      status: false,
      code: errorCode,
      data,
    };
  },
  handleResponseError (response) {
    const { status, data } = response;
    console.log(status, data)
    // const errorCode = status || ERROR_CODE_SERVER;
    // const errorMessage = data ? (data.message || data.error) : i18n.t('common.message.error');

    // switch (errorCode) {
    //   case ERROR_CODE_UNAUTHORIZED: // 401
    //     if (get(router, 'history.router.history.current.name') !== 'login') {
    //       alertService.displayToastErrorMessage(errorMessage);
    //       userService.unsetUser();
    //       router.push({ name: 'login' });
    //     }
    //     break;
    //   case ERROR_CODE_VALIDATE: // 422
    //   case ERROR_CODE_BAD_REQUEST: // 400
    //     return {
    //       status: false,
    //       errorCode: errorCode,
    //       data: data ? data?.errors : {},
    //       message: errorMessage,
    //     };
    //
    //   case ERROR_CODE_NOT_FOUND: // 404
    //     alertService.displayToastErrorMessage(i18n.t('common.message.not_found'));
    //     break;
    //   case ERROR_CODE_FORBIDDEN: // 403
    //     alertService.displayToastErrorMessage(i18n.t('common.message.no_permission'));
    //     break;
    //   case ERROR_CODE_SERVER: // 500
    //     alertService.displayToastErrorMessage(i18n.t('common.message.error'));
    //     break;
    //   default:
    //     console.log('has error');
    //     break;
    // }
  },
  handleNoResponse (request) {
    console.log('handleNoResponse', request);
  },
  ERROR_CODE_VALIDATE,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_SERVER,
};
