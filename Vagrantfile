Vagrant.configure("2") do |config|
  config.vm.box = "bento/rockylinux-9"
  config.vm.network "public_network"
  
  # Mac M4 전용 설정 (Provider: vmware_desktop 또는 parallels 추천)
  config.vm.provider "vmware_desktop" do |v|
    v.gui = false
    v.cpus = 2
    v.memory = 4096
  end

  # 도커 설치 및 실행
  config.vm.provision "shell", inline: <<-SHELL
    yum install -y yum-utils
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    systemctl enable --now docker
    echo 'nameserver 8.8.8.8' > /etc/resolv.conf
    usermod -aG docker vagrant
    newgrp docker
    #cd /vagrant && docker compose up -d
  SHELL

  #config.vm.network "forwarded_port", guest: 80, host: 8080 # Frontend
  #config.vm.network "forwarded_port", guest: 8080, host: 8888 # Backend
end
