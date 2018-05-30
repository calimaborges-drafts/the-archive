#!/bin/bash
ansible wordpress -i hosts -m shell -a 'echo Hello, World'