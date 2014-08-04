moveFiles
=========

Node script to help move files using optimized file streams.  Recursively searches folders and 
copies them (does not delete original files/folders).

This should not be used for large files, although it will throttle, it will consume resources.

Instead use bash script move for local Windows, Linux, Darwin file systems.

TODO: Add support for remote containers (AWS S3 buckets).
TODO: Add command line argument support.
