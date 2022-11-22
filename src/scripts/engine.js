import { openDatabase } from 'react-native-sqlite-storage';

export default class Engine {

    database = openDatabase({ name: '../resources/database/planMiamDb.db' });

    
}

db.transaction(function(txn) {
    txn.executeSql(
      query,  //Query to execute as prepared statement
      argsToBePassed[],  //Argument to pass for the prepared statement
      function(tx, res) {}  //Callback function to handle the result
    );
  });