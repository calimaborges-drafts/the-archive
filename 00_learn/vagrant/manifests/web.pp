exec { "apt-update":
    command => "/usr/bin/apt-get update"
}

package { ["nodejs", "mysql-server", "npm"]:
    ensure => installed,
    require => Exec["apt-update"]
}

exec { "install-deps":
    command => "/usr/bin/npm install",
    require => Package["npm"]
}

file { "/lib/systemd/system/hello-world.service":
    source => "/vagrant/manifests/hello-world.service",
    owner => vagrant,
    group => vagrant,
    mode => "0644",
    require => Package["nodejs"]
}

service { "hello-world":
    ensure => running,
    enable => true,
    hasstatus => true,
    hasrestart => true,
    require => File["/lib/systemd/system/hello-world.service"]
}

service { "mysql":
    ensure => running,
    enable => true,
    hasstatus => true,
    hasrestart => true,
    require => Package["mysql-server"]
}

exec { "musicjungle":
    command => "mysqladmin -uroot create musicjungle",
    unless => "mysql -u root musicjungle",
    path => "/usr/bin",
    require => Service["mysql"]
}

exec { "mysql-grants": 
    command => "mysql -uroot -e \"GRANT ALL PRIVILEGES ON * TO 'musicjungle'@'%' IDENTIFIED BY 'minha-senha';\" musicjungle",
    unless  => "mysql -umusicjungle -pminha-senha musicjungle",
    path => "/usr/bin",
    require => Service["hello-world"]
}

file_line { "production":
    file => "/etc/hello-world.properties",
    line => "hello-world.environment=production",
    notify => Service["hello-world"]
}

define file_line($file, $line) {
    exec { "/bin/echo '${line}' >> '${file}'":
        unless => "/bin/grep -qFx '${line}' '${file}'"
    }
}
