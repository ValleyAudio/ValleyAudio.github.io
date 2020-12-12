var modules = [
  {
    slug: 'Amalgam',
    name: 'Amalgam',
    tags: ['Effects'],
    description: 'Multimode, stereo signal masher'
  },
  {
    slug: 'Dexter',
    name: 'Dexter',
    tags: ['VCO'],
    description: '4-Op FM synthesis VCO',
  },
  {
    slug: 'Feline',
    name: 'Feline',
    tags: ['Filter'],
    description: 'Stereo OTA filter',
  },
  {
    slug: 'Interzone',
    name: 'Interzone',
    tags: ['Voice'],
    description: 'A monophonic, virtual analogue synth voice',
  },
  {
    slug: 'Terrorform',
    name: 'Terrorform',
    tags: ['VCO'],
    description: 'Wavetable synthesis voice',
  },
  {
    slug: 'Topograph',
    name: 'Topograph & µGraph',
    tags: ['Sequencer'],
    description: 'Topographic drum sequencers',
  },
  {
    slug: 'Plateau',
    name: 'Plateau',
    tags: ['Effects'],
    description: 'Lush plate reverb'
  },
]


function uniq(a) {
  let seen = new Set();
  return a.filter(item => {
    let k = item;
    return seen.has(k) ? false : seen.add(k);
  });
}

var tags = uniq(Array.prototype.concat.apply([], modules.map(x => x.tags)))
               .sort(function(a, b) {
                 if (a < b)
                   return -1;
                 else
                   return 1;
               });

var prefix = '';

function addModuleElement(m) {
  var div = document.createElement('a');
  div.className = 'ModuleGridElement'
  div.id = m.slug;
  if (m.link != undefined) {
    div.href = 'rack/' + m.link.toLowerCase();

  } else {
    div.href = 'rack/' + m.slug.toLowerCase();
  }

  var title = document.createElement('div');
  title.innerHTML = m.name;
  title.className = 'ModuleName';
  div.appendChild(title);

  var description = document.createElement('div');
  description.innerHTML = m.description;
  description.className = 'ModuleDescription';
  div.appendChild(description);

  var img = document.createElement('img');
  img.src = 'rack/' + m.slug + '/images/' + m.slug + 'icon.jpg';
  div.appendChild(img);

  document.getElementById('module-grid').appendChild(div);
}

var active_package_filter = 'All';
var active_tags_filter = [];

function activeTag(id) {
  var index = -1;
  for (var i = 0; i < active_tags_filter.length; i++) {
    if (active_tags_filter[i] == id) {
      index = i;
    }
  }
  return index;
}

function keepModule(m) {
  var cond2 = active_tags_filter.length == 0 ? true : false;
  // By Tags
  for (var i = 0; i < m.tags.length; i++) {
    var tag = m.tags[i];
    if (activeTag(tag) >= 0) {
      cond2 = true;
    }
  }
  return cond2;
}

function filterModules() {
  for (var i = 0; i < modules.length; i++) {
    var m = modules[i];
    var keep = keepModule(m);
    var elem = document.getElementById(m.slug);
    elem.hidden = !keep;
  }
}

function tagFilter(id) {
  var index = activeTag(id);
  if (index >= 0) {
    active_tags_filter.splice(index, 1);
  } else {
    active_tags_filter.push(id);
  }
  for (var i = 0; i < tags.length; i++) {
    var elem = document.getElementById(tags[i] + '-filter');
    if (activeTag(tags[i]) >= 0) {
      elem.className = 'FilterButtonActive';
    } else {
      elem.className = 'FilterButton';
    }
  }
  console.log(active_tags_filter);
  filterModules();
}

function addButton(name, to, callback) {
  var div = document.createElement('div');
  div.style.marginTop = '5px';
  div.style.marginBottom = '5px';
  div.style.marginLeft = '2px';
  div.style.marginRight = '2px';

  div.style.float = 'left'
  var b = document.createElement('a');
  b.id = name + '-filter';
  b.className = 'FilterButton';
  b.role = 'button';
  b.innerHTML = name;
  b.style.color = 'rgb(255, 255, 255)';
  b.style.textDecoration = 'none';
  b.onclick = function() {
    callback(name);
  };
  b.href = 'javascript:void(null);';
  div.appendChild(b);
  document.getElementById(to).appendChild(div);
}

function populateGrid() {
  var grid = document.createElement('div');
  grid.id = 'module-grid';

  document.getElementById('modules').appendChild(grid);

  for (var i = 0; i < modules.length; i++) {
    addModuleElement(modules[i]);
  }
}
