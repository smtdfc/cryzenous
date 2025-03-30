export const SUPPORTED_ENV =[
  'android',
  'pc'
];

export const ENV_API_MAP ={
  'android':window.CRYZENOUS_ANDROID_ENV_API,
  'pc':window.CRYZENOUS_PC_ENV_API,
};

export function getEnvAPI(){
  let env = getCurrentEnv();
  return ENV_API_MAP[env];
}

export function getCurrentEnv(){
  return window.CRYZENOUS_ENV_NAME ?? 'PC';
}