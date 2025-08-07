import { ZodError } from 'zod';
import { TErrorSources, TGenericErrorResponse } from './interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue) => {
    const lastPath = issue.path[issue.path.length - 1];
    return {
      path: typeof lastPath === 'string' || typeof lastPath === 'number' ? lastPath : String(lastPath),
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
