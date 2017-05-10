#!/usr/bin/env bash
docker exec -it raging_goblin bash -c 'export PATH=/root/.yarn/bin:$PATH && cd /raging-goblin && yarn run tdd'