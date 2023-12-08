const processPGArrayToArray = <R, >(pgArray: string): R[] => pgArray.replace(/({|})/gi, '').split(',') as unknown as R[];

export default processPGArrayToArray;
