/**
  ** UUID Generator JavaScript Class (v1.0.1 Beta) - A JavaScript Class Method to generate UUID (version 4).
  ** 20th of December 2020
  ** Released by @Zarkmend_ZAN on Twitter, @ZamyArkreNendmed on GitHub under the MIT License
*/

"use strict";
const uuid_generator_class = class {
  constructor(options) {
    if (typeof options !== "object") options = {};
    this.data = Object.create({});
    this.data.only_numbers = (options.only_numbers || false);
    this.data.only_heksadecimal_characters = !options.only_numbers ? (options.only_heksadecimal_characters || false) : false;
    this.data.use_uppercase_letters = !options.only_numbers ? (options.use_uppercase_letters || false) : false;
    this.data.uuid_version = "version_4";
  };
  set_options(options) {
    if (typeof options !== "object") options = {};
    this.data.only_numbers = (options.only_numbers || false);
    this.data.only_heksadecimal_characters = !options.only_numbers ? (options.only_heksadecimal_characters || false) : false;
    this.data.use_uppercase_letters = !options.only_numbers ? (options.use_uppercase_letters || false) : false;
  };
  generate_uuid() {
    let generated_uuid = String("");

    const uuid = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    const uuid_decimal = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    const uuid_heksadecimal_characters = [ "a", "b", "c", "d", "e", "f" ];

    const uuid_version_pattern = {
      "version_4": [ 8, 4, 4, 4, 12 ]
    };

    if (this.data.only_numbers) {
      for (let index = 0; index < uuid_version_pattern[this.data.uuid_version].length; index++) {
        for (let counter = 1; counter <= uuid_version_pattern[this.data.uuid_version][index]; counter++) generated_uuid += String(uuid_decimal[Math.floor(Math.random() * uuid_decimal.length)]);
        if (index < uuid_version_pattern[this.data.uuid_version].length - 1) generated_uuid += String("-");
      };
    }
    else if (this.data.only_heksadecimal_characters) {
      for (let index = 0; index < uuid_version_pattern[this.data.uuid_version].length; index++) {
        for (let counter = 1; counter <= uuid_version_pattern[this.data.uuid_version][index]; counter++) generated_uuid += String(uuid_heksadecimal_characters[Math.floor(Math.random() * uuid_heksadecimal_characters.length)]);
        if (index < uuid_version_pattern[this.data.uuid_version].length - 1) generated_uuid += String("-");
      };
    }
    else {
      for (let index = 0; index < uuid_version_pattern[this.data.uuid_version].length; index++) {
        for (let counter = 1; counter <= uuid_version_pattern[this.data.uuid_version][index]; counter++) generated_uuid += String(uuid[Math.floor(Math.random() * uuid.length)]);
        if (index < uuid_version_pattern[this.data.uuid_version].length - 1) generated_uuid += String("-");
      };
    };

    return (this.data.use_uppercase_letters ? generated_uuid.toUpperCase() : generated_uuid);
  };
};